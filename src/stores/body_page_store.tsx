import { create } from "zustand";

interface BodyPageStore{
    bodyPage: number;
    setBodyPage: (name: number) => void;
}

const useBodyPageStore = create<BodyPageStore>((set) => ({
    bodyPage: 0,
    setBodyPage: (number) => set({ bodyPage: number }),
}));

export default useBodyPageStore 