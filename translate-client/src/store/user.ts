import { Chat, User } from "@/api";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  chats: Chat[];
  setUser: (user: User) => void;
  setChats: (chats: Chat[]) => void;
  newChat: (chat: Chat) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  chats: [],
  setUser: (user) => {
    set({ user });
  },
  setChats: (chats: Chat[]) => {
    set({ chats });
  },
  newChat: (chat) => {
    set((state) => ({
      chats: [...state.chats, chat],
    }));
  },
}));
