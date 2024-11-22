import { create } from "zustand";

interface bookViewerStoreProps{
    currentBookId: string;
    currentPageNumber: number;
    currentPageCount: number;
    currentViewMode: string;
    setCurrentBookId: (bookId: string) => void;
    setCurrentPageNumber: (pageNumber: number) => void;
    setCurrentPageCount: (pageCount: number) => void;
    setCurrentViewMode: (viewMode: string) => void;

    currentClicked: string;
    setCurrentClicked: (value: string) => void;

}

const useBookViewerStore = create<bookViewerStoreProps>((set) => ({
    currentBookId: "000",
    currentPageNumber: -1,
    currentPageCount: 0,
    currentViewMode: "",
    setCurrentBookId: (bookId) => set((state) => ({...state, currentBookId: bookId })),
    setCurrentPageNumber: (pageNumber) => set((state) => ({...state, currentPageNumber: pageNumber })),
    setCurrentPageCount: (pageCount) => set((state) => ({...state, currentPageCount: pageCount })),
    setCurrentViewMode: (viewMode) => set((state) => ({...state, currentViewMode: viewMode })),

    currentClicked: "bracket",
    setCurrentClicked: (value) => set((state) => ({ ...state, currentClicked: value })),

}));

export default useBookViewerStore;