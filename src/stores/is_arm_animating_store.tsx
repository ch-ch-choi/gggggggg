import { create } from "zustand";

interface IsArmAnimating{
    isArmAnimating: boolean;
    setIsArmAnimating: (value: boolean) => void;
    isBookChanging: boolean;
    setIsBookChanging: (value: boolean) => void;
}

const useIsArmAnimatingStore = create<IsArmAnimating>((set) => ({
    isArmAnimating: false,
    setIsArmAnimating: (value) => set((state) => ({ ...state, isArmAnimating: value })),
    isBookChanging: false,
    setIsBookChanging: (value) => set((state) => ({ ...state, isBookChanging: value })),
}));

export default useIsArmAnimatingStore;