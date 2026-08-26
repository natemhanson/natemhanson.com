import type { Metadata } from "next";
import { Newsreader, DM_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://natemhanson.com"),
  title: "Nate Hanson",
  description:
    "Dad, builder, and co-founder of Arbor. I started Arbor to take the hard parts of homeschooling off parents’ plates, so more families can raise their kids together.",
  openGraph: {
    title: "Nate Hanson",
    description:
      "Dad, builder, and co-founder of Arbor — helping more families raise their kids together.",
    url: "https://natemhanson.com",
    siteName: "Nate Hanson",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
