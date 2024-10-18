"use client";

import { Chat, getChat } from "@/api";
import Loading from "@/components/Loading";
import { useChatStore } from "@/store/chat";
import { useHomeStore } from "@/store/home";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatPage = ({ params }: { params: { chatId: string } }) => {
  const param = useParams();
  const chat_id = parseInt(param.chatId as string);
  if (isNaN(chat_id)) {
    redirect("/home");
  }
  const setNewChatScreen = useHomeStore((state) => state.setNewChatScreen);
  const translateMessage = useHomeStore((state) => state.translatingMessage);
  const setChat = useChatStore((state) => state.setChatData);
  const messages = useChatStore((state) => state.chat?.messages);

  useEffect(() => {
    setNewChatScreen(false);
    const loadChat = async (chat_id: number) => {
      // Load chat
      await getChat(
        chat_id,
        (chat) => {
          setChat(chat);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    loadChat(chat_id);
  }, []);

  if (!messages) {
    return <Loading size={32} />;
  }

  const chats = messages.map((message, idx) => {
    // if the chat is sent_by_yser, then align to right
    // time in format 11:24 Sun Oct 13
    const time = new Date(message.created_at).toLocaleString();
    return (
      <div
        key={idx}
        className={`flex flex-col py-2 ${
          message.sent_by_user ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`
            ${message.sent_by_user ? "bg-[#2E2E2E]" : "bg-[#202020]"}
          py-3 px-6 rounded-xl max-w-lg`}
        >
          {message.content}
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-400 mt-2 italic">{time}</div>
        </div>
      </div>
    );
  });

  // if we are translating the next message
  // show a bot spinner in the sequence of messages, aligned to left
  return (
    <div className="">
      <div>{chats}</div>
      {translateMessage && (
        <div className="flex flex-col items-start">
          <div className="bg-[#202020] py-3 px-6 rounded-xl">
            <div className="animate-spin h-5 w-5 rounded-full border-2 border-[#2E2E2E] border-t-[#F5F5F5]">
              {" "}
            </div>
          </div>
          <div className="text-sm text-gray- 400 mt-2 italic">
            Translating...
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
