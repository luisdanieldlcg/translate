"use client";

import ChatInput from "@/components/home/ChatInput";
import React from "react";
import { FiSidebar, FiUser } from "react-icons/fi";
import { useHomeStore } from "@/store/home";
import Loading from "@/components/Loading";
import AuthCheck from "@/components/AuthCheck";
const Home = () => {
  const toggleSidebar = useHomeStore((state) => state.toggleSidebar);
  const creatingChat = useHomeStore((state) => state.creatingChat);
  return (
    <AuthCheck>
      <div className="max-w-screen-2xl mx-auto text-center flex flex-col h-screen">
        <nav className="flex items-center justify-between my-4">
          <FiSidebar
            className="text-3xl cursor-pointer"
            onClick={toggleSidebar}
          />
          <FiUser className="text-3xl" />
        </nav>
        <div className="m-auto flex flex-col gap-12">
          <h1 className="font-bold text-4xl">
            What do you want to translate?{" "}
          </h1>
          {creatingChat ? (
            <Loading size={64} className="mx-auto" />
          ) : (
            <ChatInput />
          )}
        </div>
      </div>
    </AuthCheck>
  );
};

export default Home;
