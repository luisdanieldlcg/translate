import { create } from "zustand";

type HomeStore = {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
  creatingChat: boolean;
  toggleCreatingChat: () => void;
};

export const useHomeStore = create<HomeStore>((set) => ({
  sidebarOpened: false,
  creatingChat: false,
  toggleSidebar: () => {
    set((state) => ({ sidebarOpened: !state.sidebarOpened }));
  },
  toggleCreatingChat: () => {
    set((state) => ({ creatingChat: !state.creatingChat }));
  },
}));
