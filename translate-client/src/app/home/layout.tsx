"use client";

import AuthCheck from "@/components/AuthCheck";
import ErrorMessage from "@/components/ErrorMessage";
import ChatInput from "@/components/home/ChatInput";
import Sidebar from "@/components/home/Sidebar";
import Loading from "@/components/Loading";
import { useHomeStore } from "@/store/home";
import { FiSidebar, FiUser } from "react-icons/fi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toggleSidebar = useHomeStore((state) => state.toggleSidebar);
  const creatingChat = useHomeStore((state) => state.creatingChat);
  const error = useHomeStore((state) => state.error);

  return (
    <>
      <AuthCheck>
        <div className="flex flex-row">
          <Sidebar />
          <nav className="my-4 fixed top-0 left-0 right-0 z-10 flex justify-around items-center px-4">
            <FiSidebar
              className="text-3xl cursor-pointer"
              onClick={toggleSidebar}
            />
            <FiUser className="text-3xl" />
          </nav>
          <div className="flex-grow">
            <div className="max-w-screen-2xl mx-auto text-center flex flex-col h-screen">
              <div className="m-auto flex flex-col gap-12 min-w-[50%]">
                <div className="h-2/5 mt-24 overflow-y-auto">{children}</div>
                {error && <ErrorMessage message={error} />}
                {creatingChat ? (
                  <Loading size={64} className="mx-auto" />
                ) : (
                  <ChatInput />
                )}
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    </>
  );
}
