import { create } from "zustand";

interface PageStore{
    page: string;
    setPage: (name: string) => void;
}

const usePageStore = create<PageStore>((set) => ({
    page: "body",
    setPage: (string) => set({ page: string }),
}));

export default usePageStore 