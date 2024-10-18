"use client";

import AuthCheck from "@/components/AuthCheck";
import ErrorMessage from "@/components/ErrorMessage";
import ChatInput from "@/components/home/ChatInput";
import ChatRoom from "@/components/home/ChatRoom";
import Sidebar from "@/components/home/Sidebar";
import Loading from "@/components/Loading";
import { useHomeStore } from "@/store/home";
import { useEffect, useRef } from "react";
import { FiSidebar, FiUser } from "react-icons/fi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toggleSidebar = useHomeStore((state) => state.toggleSidebar);

  const isSidebarOpened = useHomeStore((state) => state.sidebarOpened);

  return (
    <>
      <AuthCheck>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex-col overflow-y-auto h-[90%] max-w-screen-2xl mx-auto">
            <div className="fixed top-0 left-72 right-0 bg-background w-screen-2xl h-20" />
            <nav className="fixed top-0 left-80 right-0 z-10 flex justify-between items-center max-w-screen-2xl mx-auto py-6  px-4">
              <FiSidebar
                className="text-3xl cursor-pointer"
                onClick={toggleSidebar}
              />
              <FiUser className="text-3xl" />
            </nav>
            <ChatRoom>{children}</ChatRoom>
          </div>
        </div>
      </AuthCheck>
    </>
  );
}
