import { create } from "zustand";

interface bookPageStoreProps{
    bookPage: number;
    setBookPage: (number: number) => void;

    selectedBookId: string;
    setSelectedBookId: (string: string) => void;

    selectedBookPages: number;
    setSelectedBookPages: (number: number) => void;
}

const useBookStore = create<bookPageStoreProps>((set) => ({
    bookPage: 0,
    setBookPage: (number) => set({ bookPage: number }),
    selectedBookId: "",
    setSelectedBookId: (string) => set({ selectedBookId: string }),
    selectedBookPages: 0,
    setSelectedBookPages: (number) => set({ selectedBookPages: number }),
}));

export default useBookStore;