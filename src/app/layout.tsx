import type { Metadata } from "next";
import { Roboto, Cinzel, Inter } from "next/font/google";
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    default: "Zherka Tweets",
    absolute: "Zherka Tweets",
  },
  description: "Tweets from the dark humor comedian Zherka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
