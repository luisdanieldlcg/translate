"use client";
import { createChat } from "@/api";
import { useHomeStore } from "@/store/home";
import { useUserStore } from "@/store/user";
import { Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import React from "react";
import { BsSend } from "react-icons/bs";

const ChatInput = () => {
  const [text, setText] = React.useState("");
  const toggleCreatingChat = useHomeStore((state) => state.toggleCreatingChat);
  const isNewChatScreen = useHomeStore((state) => state.newChatScreen);

  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    // Check if "Enter" is pressed
    if (e.key === "Enter") {
      // If Shift is not pressed, submit the form
      if (!e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (text.trim() !== "") {
      console.log(text);
      setText(""); // Clear input after submission
      toggleCreatingChat();
      await handleCreateChat();
      toggleCreatingChat();
    }
  };

  const user = useUserStore((state) => state.user);
  const setError = useHomeStore((state) => state.setError);
  const router = useRouter();

  const handleCreateChat = async () => {
    setError("");

    if (!user || !user.userId) {
      console.log("create:", user);
      setError("Re-authenticate, please.");
      return;
    }
    await createChat(
      text,
      user.userId,
      (chat) => {
        setError("");
        router.push(`/home/chats/${chat.chat_id}`);
      },
      (_) => {
        setError("Could not create chat. Please try again.");
      }
    );
  };
  // if we are not on newChatScreen,  put the input on the bottom
  return (
    <div
      className={
        isNewChatScreen ? "" : "bottom-0 fixed min-w-[42rem] my-6 z-50"
      }
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          minRows={1}
          variant="bordered"
          placeholder="Translate anything"
          value={text}
          classNames={{
            input: "outlined-input ",
            inputWrapper: "border-0",
          }}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">
          <BsSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
