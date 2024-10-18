"use client";
import { Chat, createChat, translate } from "@/api";
import { useChatStore } from "@/store/chat";
import { useHomeStore } from "@/store/home";
import { useUserStore } from "@/store/user";
import { supportedLanguages } from "@/supported-languages";
import { Textarea } from "@nextui-org/input";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Props {
  onSendMessage: () => void; // Add prop type for the scroll function
}

const ChatInput = ({ onSendMessage }: Props) => {
  const [text, setText] = useState("");
  const toggleCreatingChat = useHomeStore((state) => state.toggleCreatingChat);
  const isNewChatScreen = useHomeStore((state) => state.newChatScreen);
  const toggleTranslatingMessage = useHomeStore(
    (state) => state.toggleTranslatingMessage
  );
  const newChat = useUserStore((state) => state.newChat);
  const chat = useChatStore((state) => state.chat);

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const user = useUserStore((state) => state.user);
  const setError = useHomeStore((state) => state.setError);
  const router = useRouter();

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

  const dropdownItems = supportedLanguages.map((lang) => (
    <DropdownItem
      key={lang.code}
      onClick={() => setSelectedLanguage(lang.code)}
    >
      {lang.name}
    </DropdownItem>
  ));

  const handleBotMessage = async (chat: Chat) => {
    toggleTranslatingMessage();
    onSendMessage(); // Scroll to the bottom
    await handleTranslate(chat);
    onSendMessage(); // Scroll to the bottom
    toggleTranslatingMessage();
    onSendMessage();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (text.trim() !== "") {
      setText(""); // Clear input after submission
      if (isNewChatScreen) {
        toggleCreatingChat();
        await handleCreateChat(async (chat) => {
          await handleBotMessage(chat);
          toggleCreatingChat();
          router.push(`/home/chats/${chat.chat_id}`);
        });
      } else {
        if (!chat) return;
        handleBotMessage(chat);
      }
    }
  };

  const handleCreateChat = async (onSuccess: (chat: Chat) => void) => {
    setError("");

    if (!user || !user.userId) {
      setError("Re-authenticate, please.");
      return;
    }
    await createChat(
      text,
      user.userId,
      (newChatInfo) => onSuccess(newChatInfo),
      (_) => {
        setError("Could not create chat. Please try again.");
      }
    );
  };

  const handleTranslate = async (chat: Chat) => {
    await translate(
      {
        chat_id: chat.chat_id,
        from: "", // tells the backend to auto-detect the language
        to: selectedLanguage,
        message: text,
      },
      (translation) => {
        const date = new Date().toISOString();
        // push my message and translation
        chat.messages.push({
          content: translation.original_text,
          created_at: date,
          message_id: translation.message_id,
          sent_by_user: true,
        });

        chat.messages.push({
          content: translation.translated_text,
          created_at: date,
          message_id: translation.message_id,
          sent_by_user: false,
        });
      },
      (_) => {}
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Dropdown
        title="Pick your target language"
        classNames={{
          base: "overflow-y-auto max-h-64 rounded-xl ring-1 ring-border",
          content: "outlined-input",
        }}
      >
        <DropdownTrigger>
          <button className="flex items-center">
            <span>{selectedLanguage}</span>
            <RiArrowDropDownLine className="text-2xl" />
          </button>
        </DropdownTrigger>
        <DropdownMenu>{dropdownItems}</DropdownMenu>
      </Dropdown>
      <Textarea
        minRows={1}
        variant="bordered"
        placeholder="Translate anything"
        value={text}
        classNames={{
          input: "outlined-input",
          inputWrapper: "border-0",
        }}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">
        <BsSend className="text-2xl" />
      </button>
    </form>
  );
};

export default ChatInput;
