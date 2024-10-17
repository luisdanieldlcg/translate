"use client";

import { Chat, getChat } from "@/api";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatPage = ({ params }: { params: { chatId: string } }) => {
  const param = useParams();
  const chat_id = parseInt(param.chatId as string);
  if (isNaN(chat_id)) {
    redirect("/home");
  }

  const [chat, setChat] = useState<Chat | null>(null);
  useEffect(() => {
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
  return (
    <div>
      {
        // title of the chat and number of messages
      }
      <h1>Chat: {chat?.title}</h1>

      {
        // list of messages
      }

      <div>
        {chat?.messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
