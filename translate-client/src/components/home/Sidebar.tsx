import { clearAllChats, getAllChats } from "@/api";
import { useChatStore } from "@/store/chat";
import { useHomeStore } from "@/store/home";
import { useUserStore } from "@/store/user";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const Sidebar = () => {
  const sidebarOpened = useHomeStore((state) => state.sidebarOpened);

  const setChats = useUserStore((state) => state.setChats);
  const allChats = useUserStore((state) => state.chats);
  const activeChat = useChatStore((state) => state.chat);

  useEffect(() => {
    const loadChats = async () => {
      getAllChats(
        (chats) => {
          setChats(chats);
        },
        (error) => {}
      );
    };
    loadChats();
  }, []);

  const router = useRouter();
  // highlight active chat

  const chats = allChats.map((chat, idx) => {
    const shouldHighlight = activeChat?.chat_id === chat.chat_id;
    return (
      <div
        key={idx}
        // className="px-4 text-sm"
        className={`${
          shouldHighlight ? "bg-[#333] rounded-lg" : ""
        } transition-all duration-300 ease-in-out`}
        onClick={() => router.push(`/home/chats/${chat.chat_id}`)}
      >
        <div
          className="flex items-center cursor-pointer hover:bg-[#333] p-2 rounded-lg truncate"
          key={idx}
        >
          <p>{chat.title.charAt(0).toUpperCase() + chat.title.slice(1)}</p>
        </div>
      </div>
    );
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClearHistory = async () => {
    clearAllChats(
      () => {
        setChats([]);
        onOpenChange();
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div
      className={`bg-[#141414] overflow-y-auto h-screen transition-all duration-300  flex flex-col px-4 py-4 gap-y-5 ${
        sidebarOpened ? "w-72" : "w-0 !px-0"
      }`}
    >
      <button
        className="primary-button flex items-center gap-3 justify-center"
        onClick={() => router.push("/home")}
      >
        New Chat
        <FaPlus />
      </button>

      <input
        type="text"
        className="outlined-input text-center !py-2"
        placeholder="Search chats"
      />
      <div className="overflow-y-auto flex flex-col gap-y-2">{chats}</div>

      <hr className="border-[#1f1f1f] my-4" />
      <button
        className="primary-button flex items-center gap-3 justify-center"
        onClick={onOpen}
      >
        Clear History
        <FaRegTrashCan />
      </button>
      <Modal
        isOpen={isOpen}
        isDismissable={true}
        onOpenChange={onOpenChange}
        classNames={{
          base: "bg-[#212121] text-[#F5F5F5] border-[#333] border-2",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3>Are you sure you want to clear all chats?</h3>
          </ModalHeader>
          <ModalBody>
            <p className="text-center italic">This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 rounded-lg bg-[#333] text-[#F5F5F5] hover:bg-[#444]"
                onClick={() => {
                  handleClearHistory();
                }}
              >
                CONFIRM
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Sidebar;
