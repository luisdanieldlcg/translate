"use client";
import { useHomeStore } from "@/store/home";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarOpened = useHomeStore((state) => state.sidebarOpened);
  return (
    <>
      <div className="flex flex-row h-screen">
        <div
          className={`bg-[#141414] overflow-y-auto transition-all duration-300 ease-in-out ${
            sidebarOpened ? "w-1/6" : "w-0"
          }`}
        >
          <h2 className="text-lg font-bold mb-4">Chats</h2>
        </div>
        <div className="flex-grow p-4">{children}</div>
      </div>
    </>
  );
}
