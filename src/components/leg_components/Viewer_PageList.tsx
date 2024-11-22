import styled from "styled-components";
import useBookViewerStore from "../../stores/book_viewer_store";
import bookPagesDataJSON from "../../assets/data/book_pages.json"
import PageContainer from "./Viewer_PageContainer";
import Page from "./Viewer_Page";

interface BookPage {
    id: string;
    pages: string[];
}

const bookPagesData: BookPage[] = JSON.parse(JSON.stringify(bookPagesDataJSON));

const PageList = () => {
    // 1페이지부터 currentPageCount-2까지 슬라이스 때려야함.
    const currentBookId = useBookViewerStore((state) => state.currentBookId);
    const currentViewMode = useBookViewerStore((state) => state.currentViewMode);
    const currentBookPagesData = bookPagesData.find((bookPage: BookPage) => bookPage.id === currentBookId);

    
    if(currentViewMode === "page") {
        return(
            <>
                {currentBookPagesData?.pages.slice(1, -1).map((page,index) => (
                    <PageContainer key={index} pageNumber = {index}>
                        <Page src={page} alt={`page${index}`} viewMode="page"/>
                    </PageContainer>
                ))}
            </>
        );
    } else if(currentViewMode === "spread"){
        return(
            <>
                {currentBookPagesData?.pages.slice(1, -1).map((page,index) => {
                    if (index % 2 === 1) {
                        <PageContainer key={index} pageNumber = {index}>
                            <Page src={page} alt={`page${index}`} viewMode="spread"/>
                            <Page src={currentBookPagesData?.pages[index + 1]} alt={`page${index + 1}`} viewMode="spread"/>
                        </PageContainer>
                    }
                    return null;
                })}
            </>
        );
    }
    return null;
    

}

export default PageList