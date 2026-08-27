import type { Metadata } from "next";
import { Bricolage_Grotesque, Karla } from "next/font/google";
import Script from "next/script";
import { AppearanceControls } from "@/components/appearance-controls";
import { AmbientPlay } from "@/components/ambient-play";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const karla = Karla({
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
      "Dad, builder, and co-founder of Arbor, helping more families raise their kids together.",
    url: "https://natemhanson.com",
    siteName: "Nate Hanson",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const appearanceBootScript = `
(() => {
  try {
    const stored = localStorage.getItem("nate-theme");
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
    if (localStorage.getItem("nate-colorblind") === "on") {
      document.documentElement.dataset.colorblind = "on";
    }
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
      <body className={`${bricolage.variable} ${karla.variable}`}>
        <Script
          id="appearance-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: appearanceBootScript }}
        />
        <AmbientPlay />
        <AppearanceControls />
        <div className="site">{children}</div>
      </body>
    </html>
  );
}
