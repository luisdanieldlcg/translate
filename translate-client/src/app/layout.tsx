"use client";
import localFont from "next/font/local";
import "./globals.css";
// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      <body className={`${poppins.className}`}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
