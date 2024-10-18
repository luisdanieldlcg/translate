import { useHomeStore } from "@/store/home";
import React, { useEffect, useRef } from "react";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import ChatInput from "./ChatInput";

interface ChatRoomProps {
  children: React.ReactNode;
}

const ChatRoom = ({ children }: ChatRoomProps) => {
  const sidebarOpened = useHomeStore((state) => state.sidebarOpened);
  const newChatScreen = useHomeStore((state) => state.newChatScreen);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const inputClass = newChatScreen
    ? "w-2/5 mt-6 mx-auto"
    : "fixed bottom-0 left-72 right-0 bg-background w-2/5 mx-auto h-20 ";

  const containerClass = newChatScreen
    ? "h-3/5 text-center flex flex-col justify-center mt-28"
    : "h-3/4 text-center flex flex-col justify-start mt-36 overflow-auto";

  const creatingChat = useHomeStore((state) => state.creatingChat);
  const error = useHomeStore((state) => state.error);

  // Scroll to the bottom when the component mounts or when children change
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll on mount and when children change
  }, [children]);
  return (
    <div className={containerClass} ref={chatContainerRef}>
      <div className="w-1/2 mx-auto">{children}</div>
      {error && <ErrorMessage message={error} />}
      {creatingChat ? (
        <Loading size={64} className="mx-auto" />
      ) : (
        <div className={inputClass}>
          <ChatInput onSendMessage={scrollToBottom} />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
