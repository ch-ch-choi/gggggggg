import { create } from "zustand";

interface IsThumbnailClicked{
    isThumbnailClicked: boolean;
    setIsThumbnailClicked: (value: boolean) => void;
}

const useIsThumbnailClickedStore = create<IsThumbnailClicked>((set) => ({
    isThumbnailClicked: false,
    setIsThumbnailClicked: (value) => set((state) => ({ ...state, isThumbnailClicked: value })),
}));

export default useIsThumbnailClickedStore;