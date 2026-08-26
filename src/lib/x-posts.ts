import { connection } from "next/server";

export const X_HANDLE = "natemhanson";
export const X_PROFILE_URL = `https://x.com/${X_HANDLE}`;

const FEED_URL = `https://api.fxtwitter.com/2/profile/${X_HANDLE}/statuses?count=20`;
const POST_LIMIT = 5;
const FRESH_MS = 60 * 1000;
const FALLBACK_MAX_AGE_MS = 60 * 60 * 1000;

export type XPhoto = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type XQuote = {
  url: string;
  text: string;
  authorName: string;
  authorHandle: string;
};

export type XPost = {
  id: string;
  url: string;
  text: string;
  createdAt: Date;
  photos: XPhoto[];
  quote: XQuote | null;
};

type Facet = {
  type?: string;
  indices?: [number, number];
  original?: string;
  replacement?: string;
  display?: string;
};

type ApiUser = {
  name?: string;
  screen_name?: string;
};

type ApiStatus = {
  type?: string;
  id?: string;
  url?: string;
  text?: string;
  created_timestamp?: number;
  created_at?: string;
  author?: ApiUser;
  replying_to?: { screen_name?: string } | null;
  reposted_by?: unknown;
  quote?: ApiStatus | null;
  raw_text?: { text?: string; facets?: Facet[] };
  media?: {
    photos?: Array<{
      url?: string;
      thumbnail_url?: string;
      width?: number;
      height?: number;
      altText?: string;
      alt_text?: string;
    }>;
  };
};

type ApiResponse = {
  code?: number;
  results?: Array<{ type?: string } & ApiStatus>;
};

// Per-instance memory, not a durable cache: it keeps repeat renders on a warm
// server from hammering the API, and papers over brief API outages. A deleted
// post can outlive the delete here by at most FRESH_MS.
let lastGood: { posts: XPost[]; fetchedAt: number } | null = null;

export async function getRecentXPosts(): Promise<XPost[]> {
  // Without this the page is prerendered and the feed freezes at deploy time
  // (an uncached fetch alone no longer opts a route out of static rendering).
  await connection();

  if (lastGood && Date.now() - lastGood.fetchedAt < FRESH_MS) {
    return lastGood.posts;
  }

  const posts = await fetchLiveXPosts();
  if (posts) {
    lastGood = { posts, fetchedAt: Date.now() };
    return posts;
  }

  if (lastGood && Date.now() - lastGood.fetchedAt < FALLBACK_MAX_AGE_MS) {
    return lastGood.posts;
  }

  return [];
}

async function fetchLiveXPosts(): Promise<XPost[] | null> {
  try {
    // fxtwitter caches API responses at its edge, keyed by URL, and can keep
    // serving a deleted post for hours; a unique param per request skips that
    // cache (the API ignores parameters it doesn't know).
    const response = await fetch(`${FEED_URL}&fresh=${Date.now()}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "natemhanson.com",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(`X feed request failed: ${response.status}`);
      return null;
    }

    const payload = (await response.json()) as ApiResponse;
    if (payload.code !== 200 || !Array.isArray(payload.results)) return null;

    const posts: XPost[] = [];

    for (const item of payload.results) {
      if (posts.length >= POST_LIMIT) break;
      const post = toPost(item);
      if (post) posts.push(post);
    }

    return posts;
  } catch (error) {
    console.error("Failed to load X posts", error);
    return null;
  }
}

function toPost(item: ApiStatus): XPost | null {
  if (item.reposted_by) return null;

  const replyHandle = item.replying_to?.screen_name?.toLowerCase();
  if (replyHandle && replyHandle !== X_HANDLE) return null;

  const id = item.id;
  const url = item.url;
  if (!id || !url) return null;

  const createdAt = parseCreatedAt(item);
  if (!createdAt) return null;

  const text = displayText(item);
  const photos = photosFrom(item);
  const quote = quoteFrom(item.quote ?? null);

  if (!text && photos.length === 0 && !quote) return null;

  return { id, url, text, createdAt, photos, quote };
}

function parseCreatedAt(item: ApiStatus): Date | null {
  if (typeof item.created_timestamp === "number" && item.created_timestamp > 0) {
    const ms =
      item.created_timestamp > 1e12
        ? item.created_timestamp
        : item.created_timestamp * 1000;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (item.created_at) {
    const date = new Date(item.created_at);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function displayText(item: ApiStatus): string {
  let text = expandUrls(item).trim();

  if (item.quote) {
    text = text
      .replace(/\s*https?:\/\/(?:www\.)?(?:x|twitter)\.com\/\S+\/status\/\S+\s*$/i, "")
      .trim();
  }

  return text;
}

function expandUrls(item: ApiStatus): string {
  const raw = item.raw_text?.text;
  const facets = item.raw_text?.facets;
  if (raw && Array.isArray(facets) && facets.length > 0) {
    const replacements = facets
      .filter(
        (facet): facet is Facet & { indices: [number, number]; replacement: string } =>
          facet.type === "url" &&
          Array.isArray(facet.indices) &&
          facet.indices.length === 2 &&
          typeof facet.replacement === "string",
      )
      .sort((a, b) => b.indices[0] - a.indices[0]);

    if (replacements.length > 0) {
      let next = raw;
      for (const facet of replacements) {
        const [start, end] = facet.indices;
        next = next.slice(0, start) + facet.replacement + next.slice(end);
      }
      return next;
    }
  }

  return item.text ?? raw ?? "";
}

function photosFrom(item: ApiStatus): XPhoto[] {
  const photos = item.media?.photos;
  if (!Array.isArray(photos)) return [];

  return photos.flatMap((photo) => {
    const url = photo.url ?? photo.thumbnail_url;
    if (!url) return [];
    return [
      {
        url,
        width: photo.width && photo.width > 0 ? photo.width : 1200,
        height: photo.height && photo.height > 0 ? photo.height : 800,
        alt: photo.altText ?? photo.alt_text ?? "",
      },
    ];
  });
}

function quoteFrom(quote: ApiStatus | null): XQuote | null {
  if (!quote?.url) return null;
  const text = (quote.text ?? quote.raw_text?.text ?? "").trim();
  if (!text) return null;

  return {
    url: quote.url,
    text,
    authorName: quote.author?.name ?? quote.author?.screen_name ?? "Post",
    authorHandle: quote.author?.screen_name ?? "",
  };
}

export function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
    timeZone: "America/Los_Angeles",
  }).format(date);
}
