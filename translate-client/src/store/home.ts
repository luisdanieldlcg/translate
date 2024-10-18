import { create } from "zustand";

type HomeStore = {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
  creatingChat: boolean;
  toggleCreatingChat: () => void;
  error: string;
  setError: (error: string) => void;
  newChatScreen: boolean;
  setNewChatScreen: (newChatScreen: boolean) => void;
};

export const useHomeStore = create<HomeStore>((set) => ({
  sidebarOpened: false,
  creatingChat: false,
  error: "",
  toggleSidebar: () => {
    set((state) => ({ sidebarOpened: !state.sidebarOpened }));
  },
  toggleCreatingChat: () => {
    set((state) => ({ creatingChat: !state.creatingChat }));
  },
  setError: (error) => {
    set(() => ({ error }));
  },
  newChatScreen: false,
  setNewChatScreen: (newChatScreen) => {
    set(() => ({ newChatScreen }));
  },
}));
