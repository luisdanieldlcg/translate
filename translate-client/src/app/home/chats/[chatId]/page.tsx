"use client";

import { Chat, getChat } from "@/api";
import { useHomeStore } from "@/store/home";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatPage = ({ params }: { params: { chatId: string } }) => {
  const param = useParams();
  const chat_id = parseInt(param.chatId as string);
  if (isNaN(chat_id)) {
    redirect("/home");
  }
  const [chat, setChat] = useState<Chat | null>(null);
  const setNewChatScreen = useHomeStore((state) => state.setNewChatScreen);

  useEffect(() => {
    setNewChatScreen(false);
    const loadChat = async (chat_id: number) => {
      // Load chat
      await getChat(
        chat_id,
        (chat) => {
          setChat(chat);
          console.log("Got title: ", chat.title);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    loadChat(chat_id);
  }, []);

  const chats = chat?.messages.map((message, idx) => {
    // if the chat is sent_by_yser, then align to right
    return (
      <div key={idx} className="flex justify-end">
        <div className="bg-[#2E2E2E] py-3 rounded-xl">{message.content}</div>
      </div>
    );
  });

  // else align to left
  return (
    <div className="">
      <div>{chats}</div>
      <div>{chats}</div>
      <div>{chats}</div>
    </div>
  );
};

export default ChatPage;
