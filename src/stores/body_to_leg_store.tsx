import { create } from "zustand";

interface bodyToLegStore{
    bodyToLeg: boolean;
    setBodyToLeg: (bodyToLeg: boolean) => void;
}

const useBodyToLegStore = create<bodyToLegStore>((set) => ({
    bodyToLeg: false,
    setBodyToLeg: (bodyToLeg) => set({ bodyToLeg}),
}));

export default useBodyToLegStore;