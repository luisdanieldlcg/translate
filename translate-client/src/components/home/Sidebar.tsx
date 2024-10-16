import { useHomeStore } from "@/store/home";
import React from "react";
import { FaPlus } from "react-icons/fa";

const Sidebar = () => {
  const sidebarOpened = useHomeStore((state) => state.sidebarOpened);

  const chatsData = [
    {
      label: "today",
      titles: [
        "hello",
        "hi",
        "how are you",
        "good morningsaokdsakokosdakosadkodaskaaaao",
      ],
    },
  ];

  const chats = chatsData.map((chat, idx) => {
    return (
      <div>
        <h1 className="font-bold"> {chat.label} </h1>
        <ul>
          {chat.titles.map((title, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 cursor-pointer hover:bg-[#333] p-2 rounded-lg truncate"
            >
              <p>{title.charAt(0).toUpperCase() + title.slice(1)}</p>
            </div>
          ))}
        </ul>
      </div>
    );
  });
  return (
    <div
      className={`bg-[#141414] overflow-y-auto transition-all duration-300 ease-in-out flex flex-col px-4 py-4 gap-5 ${
        sidebarOpened ? "w-1/6" : "w-0 !px-0"
      }`}
    >
      <button className="primary-button flex items-center gap-3 justify-center">
        New Chat
        <FaPlus />
      </button>

      <input
        type="text"
        className="outlined-input text-center"
        placeholder="Search chats"
      />

      {chats}
    </div>
  );
};

export default Sidebar;
