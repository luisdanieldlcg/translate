import { create } from "zustand";

type HomeStore = {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
};

export const useHomeStore = create<HomeStore>((set) => ({
  sidebarOpened: false,
  toggleSidebar: () => {
    set((state) => ({ sidebarOpened: !state.sidebarOpened }));
  },
}));
