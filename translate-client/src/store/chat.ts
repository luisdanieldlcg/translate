import { Chat, Message } from "@/api";
import { create } from "zustand";

type ChatStore = {
  chat: Chat | null;
  setChatData: (chat: Chat) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  chat: null,
  setChatData: (chat) => {
    set({ chat });
  },
}));
