import { create } from "zustand";

interface HoveredBookStore{
    hoveredBook: string;
    setHoveredBook: (id: string) => void;
}

const useHoveredBookStore = create<HoveredBookStore>((set) => ({
    hoveredBook: "000",
    setHoveredBook: (id) => set({ hoveredBook: id }),
}));

export default useHoveredBookStore;