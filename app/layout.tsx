import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crafted Loops by Purvi | Handmade Crochet",
  description: "Explore personalised crochet pieces handmade by Purvi, choose your colors, and send an inquiry for your favorite design.",
  icons: {
    icon: "/crafted-loops-logo.jpeg",
    shortcut: "/crafted-loops-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
