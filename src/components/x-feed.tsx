import Image from "next/image";
import type { ReactNode } from "react";
import { formatPostDate, getRecentXPosts, X_HANDLE, X_PROFILE_URL, type XPost } from "@/lib/x-posts";
import styles from "./x-feed.module.css";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function XMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export async function XFeed() {
  const posts = await getRecentXPosts();

  return (
    <section id="posts" className={styles.section} aria-labelledby="posts-heading">
      <h2 className={styles.heading} id="posts-heading">
        On X
      </h2>
      <p className={styles.intro}>
        This is pretty much the only place I post. Recent notes from{" "}
        <a href={X_PROFILE_URL} target="_blank" rel="noreferrer">
          @{X_HANDLE}
        </a>
        .
      </p>

      {posts.length > 0 ? (
        <ol className={styles.list}>
          {posts.map((post) => (
            <li key={post.id}>
              <XPostCard post={post} />
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.empty}>
          The live feed is taking a rest. You can still read everything on{" "}
          <a href={X_PROFILE_URL} target="_blank" rel="noreferrer">
            X
          </a>
          .
        </p>
      )}

      <a href={X_PROFILE_URL} target="_blank" rel="noreferrer" className={styles.more}>
        <XMark />
        More on X
        <ArrowIcon />
      </a>
    </section>
  );
}

export function XFeedSkeleton() {
  return (
    <section id="posts" className={styles.section} aria-busy="true" aria-label="On X">
      <h2 className={styles.heading}>On X</h2>
      <p className={styles.intro}>Loading recent posts…</p>
      <div className={styles.skeletonList}>
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
        <div className={styles.skeleton} />
      </div>
    </section>
  );
}

function XPostCard({ post }: { post: XPost }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <time dateTime={post.createdAt.toISOString()} className={styles.time}>
          {formatPostDate(post.createdAt)}
        </time>
        <a href={post.url} target="_blank" rel="noreferrer" className={styles.permalink}>
          Open on X
        </a>
      </div>

      {post.text ? <p className={styles.text}>{linkify(post.text)}</p> : null}

      {post.photos.length > 0 ? (
        <div className={styles.photos} data-count={Math.min(post.photos.length, 4)}>
          {post.photos.slice(0, 4).map((photo) => (
            <a
              key={photo.url}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className={styles.photoLink}
            >
              <Image
                src={photo.url}
                alt={photo.alt || "Photo from this post"}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 92vw, 560px"
                className={styles.photo}
              />
            </a>
          ))}
        </div>
      ) : null}

      {post.quote ? (
        <a href={post.quote.url} target="_blank" rel="noreferrer" className={styles.quote}>
          <span className={styles.quoteAuthor}>
            {post.quote.authorName}
            {post.quote.authorHandle ? ` @${post.quote.authorHandle}` : ""}
          </span>
          <span className={styles.quoteText}>{truncate(post.quote.text, 180)}</span>
        </a>
      ) : null}
    </article>
  );
}

const TOKEN =
  /https?:\/\/[^\s]+|@[A-Za-z0-9_]+|#[A-Za-z0-9_]+/g;

function linkify(text: string) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(TOKEN.source, "g");

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }

    const token = match[0];
    const trimmed = token.replace(/[),.;!?]+$/g, "");
    const trailing = token.slice(trimmed.length);

    if (trimmed.startsWith("http")) {
      nodes.push(
        <a key={`${match.index}-url`} href={trimmed} target="_blank" rel="noreferrer">
          {prettyUrl(trimmed)}
        </a>,
      );
    } else if (trimmed.startsWith("@")) {
      nodes.push(
        <a
          key={`${match.index}-mention`}
          href={`https://x.com/${trimmed.slice(1)}`}
          target="_blank"
          rel="noreferrer"
        >
          {trimmed}
        </a>,
      );
    } else {
      nodes.push(
        <a
          key={`${match.index}-tag`}
          href={`https://x.com/hashtag/${trimmed.slice(1)}`}
          target="_blank"
          rel="noreferrer"
        >
          {trimmed}
        </a>,
      );
    }

    if (trailing) nodes.push(trailing);
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function prettyUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = `${parsed.pathname}${parsed.search}`.replace(/\/$/, "");
    const display = `${host}${path}`;
    return display.length > 42 ? `${display.slice(0, 41)}…` : display;
  } catch {
    return url;
  }
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}
