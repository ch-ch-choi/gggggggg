import { create } from "zustand";

interface IsArmAnimating{
    isArmAnimating: boolean;
    setIsArmAnimating: (value: boolean) => void;
}

const useIsArmAnimatingStore = create<IsArmAnimating>((set) => ({
    isArmAnimating: false,
    setIsArmAnimating: (value) => set((state) => ({ ...state, isArmAnimating: value })),
}));

export default useIsArmAnimatingStore;