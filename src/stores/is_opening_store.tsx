import { create } from "zustand";

interface IsOpening{
    isOpening: boolean;
    setIsOpening: (value: boolean) => void;
}

const useIsOpeningStore = create<IsOpening>((set) => ({
    isOpening: true,
    setIsOpening: (value) => set((state) => ({ ...state, isOpening: value })),
}));

export default useIsOpeningStore;