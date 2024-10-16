"use client";

import Sidebar from "@/components/home/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-row h-screen">
        <Sidebar />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </>
  );
}
