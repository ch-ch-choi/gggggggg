import { create } from "zustand";

interface PageDirection {
    pageDirection: number;
    setPageDirection: (number: number) => void;
}
  
const usePageDirectionStore = create<PageDirection>((set) => ({
    pageDirection: 0,
    setPageDirection: (number) => set({ pageDirection: number }),
}));

export default usePageDirectionStore;

