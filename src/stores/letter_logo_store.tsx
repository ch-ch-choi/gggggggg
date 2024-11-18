import { create } from "zustand";

interface LetterLogoStore {
    letterNumber: number;
    setLetterNumber: (number: number) => void;
}
  
export const useLetterLogoStore = create<LetterLogoStore>((set) => ({
    letterNumber: 1,
    setLetterNumber: (number) => set({ letterNumber: number }),
}));

