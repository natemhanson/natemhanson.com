import type { Metadata } from "next";
import { Caveat, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import { AmbientPlay } from "@/components/ambient-play";
import { X_HANDLE, X_PROFILE_URL } from "@/lib/x-posts";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const DESCRIPTION =
  "Dad and builder. Right now I’m building Arbor, helping build Buffer, and hosting Faith Lab.";

export const metadata: Metadata = {
  metadataBase: new URL("https://natemhanson.com"),
  title: {
    default: "Nate Hanson",
    template: "%s · Nate Hanson",
  },
  description: DESCRIPTION,
  applicationName: "Nate Hanson",
  authors: [{ name: "Nate Hanson", url: "https://natemhanson.com" }],
  creator: "Nate Hanson",
  publisher: "Nate Hanson",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nate Hanson",
    description: DESCRIPTION,
    url: "https://natemhanson.com",
    siteName: "Nate Hanson",
    locale: "en_US",
    type: "profile",
    firstName: "Nate",
    lastName: "Hanson",
    username: X_HANDLE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nate Hanson",
    description: DESCRIPTION,
    creator: `@${X_HANDLE}`,
    site: `@${X_HANDLE}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Person schema, so search engines can tell this Nate Hanson from the others.
// Every claim here is one the page itself already makes.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nate Hanson",
  url: "https://natemhanson.com",
  image: "https://natemhanson.com/nate.jpg",
  description: DESCRIPTION,
  jobTitle: "Co-founder",
  worksFor: {
    "@type": "Organization",
    name: "Arbor",
    url: "https://arborhomeschool.com",
  },
  sameAs: [X_PROFILE_URL],
};

const appearanceBootScript = `
(() => {
  try {
    document.documentElement.dataset.theme =
      localStorage.getItem("nate-theme") === "dark" ? "dark" : "light";
  } catch (_) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${hanken.variable} ${caveat.variable}`}>
        <Script
          id="appearance-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: appearanceBootScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <AmbientPlay />
        <div className="site">{children}</div>
      </body>
    </html>
  );
}
