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
  translatingMessage: boolean;
  toggleTranslatingMessage: () => void;
};

export const useHomeStore = create<HomeStore>((set) => ({
  sidebarOpened: true,
  creatingChat: false,
  error: "",
  newChatScreen: false,
  translatingMessage: false,
  toggleSidebar: () => {
    set((state) => ({ sidebarOpened: !state.sidebarOpened }));
  },
  toggleCreatingChat: () => {
    set((state) => ({ creatingChat: !state.creatingChat }));
  },
  setError: (error) => {
    set(() => ({ error }));
  },
  setNewChatScreen: (newChatScreen) => {
    set(() => ({ newChatScreen }));
  },
  toggleTranslatingMessage: () => {
    set((state) => ({ translatingMessage: !state.translatingMessage }));
  },
}));
