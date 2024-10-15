import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },

    {
      path: "./fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
});
export const metadata: Metadata = {
  title: "Translate",
  description: "A Chatbot that for translating text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
