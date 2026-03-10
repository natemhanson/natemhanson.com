import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nate Hanson",
  description:
    "Nate Hanson is the host of Faith Lab and the builder behind FaithPods. Book interviews, explore current work, and get in touch without exposing a personal email.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
