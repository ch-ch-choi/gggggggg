import styled from "styled-components"

import Page from "./Viewer_Page";
import PageContainer from "./Viewer_PageContainer";
import PageList from "./Viewer_PageList";
import BookCover from "../arm_components/arm_home_components/BookCover";
import LoadingAnimation from "./LoadingAnimation";

import bookPagesDataJSON from "../../assets/data/book_pages.json"
import useBookViewerStore from "../../stores/book_viewer_store";
import { useCallback, useEffect } from "react";


interface BookPage {
    id: string;
    pages: string[];
}
const bookPagesData: BookPage[] = JSON.parse(JSON.stringify(bookPagesDataJSON));
const Container = styled.div`
    width: 100%; height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const Viewer = () => {
    const currentBookId = useBookViewerStore((state) => state.currentBookId);
    const currentPageNumber = useBookViewerStore((state) => state.currentPageNumber);
    const currentViewMode = useBookViewerStore((state) => state.currentViewMode);
    const currentPageCount = useBookViewerStore((state) => state.currentPageCount);
    const setCurrentBookId = useBookViewerStore((state) => state.setCurrentBookId);
    const setCurrentPageNumber = useBookViewerStore((state) => state.setCurrentPageNumber);
    const setCurrentPageCount = useBookViewerStore((state) => state.setCurrentPageCount);
    const setCurrentViewMode = useBookViewerStore((state) => state.setCurrentViewMode);

    const currentBookPagesData = bookPagesData.find((bookPage: BookPage) => bookPage.id === currentBookId);
    
    const handleResize = useCallback(() => {
        setCurrentViewMode(window.innerWidth > 1440 ? "spread" : "page");
    }, [setCurrentViewMode]);
    
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    useEffect(() => {
        setCurrentPageNumber(-1);
        setCurrentPageCount(currentBookPagesData ? currentBookPagesData.pages.length : 0);
    },[currentBookId])

    useEffect(() => {
        if (currentPageNumber % 2 === 1 && currentPageNumber !== 0){
            setCurrentPageNumber(currentPageNumber - 1);
        }
    }, [currentViewMode])
    
    if (!currentBookPagesData){return null;} // 선택된 책이 없을 경우 아무것도 렌더링하지 않음
    return(
        <Container>
            {/* // 1. -1 페이지, 0 페이지 */}
            <PageContainer pageNumber = {-1}>
                <BookCover/>
                <LoadingAnimation/>
            </PageContainer>

            <PageContainer pageNumber = {0}>
                <Page src={currentBookPagesData?.pages[0]} viewMode="page"/>
            </PageContainer>

            {/* // 2. 페이지 리스트 */}
            <PageList />

            {/* // 3. 마지막 페이지 */}
            <PageContainer pageNumber = {currentPageCount - 1}>
                <Page src={currentBookPagesData.pages[currentPageCount - 1]} viewMode="page"/>
            </PageContainer>
        </Container>
    );

}

export default Viewer
