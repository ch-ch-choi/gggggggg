import styled from "styled-components";
import bookPageThumbnailsDataJSON from "../../assets/data/book_page_thumbnails.json";
import { useRef } from "react";
import useBookViewerStore from "../../stores/book_viewer_store";
import { pageMouseDown, pageMouseEnter, pageMouseLeave, pageMouseUp } from "../../animations/pageClickAnimations";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import useIsThumbnailClickedStore from "../../stores/is_thumbnail_clicked_store";
import Thumbnail from "./ThumbnailList_Thumbnail";

interface BookThumbnails{
    id: string;
    thumbnails: string[];
}

const bookPageThumbnailsData: BookThumbnails[] = JSON.parse(JSON.stringify(bookPageThumbnailsDataJSON));

const Container = styled.div`
    width: 260px; height: 100%;
    padding: 42px 18px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    overflow: auto;
    scrollbar-width: none;
`;

const Blank = styled.div`
    width: 96px; height: 131px;
    background-color: transparent;
`;

const SpreadContainer = styled.div`
    position: relative;
    display: flex;
`;

const SpreadMouseDetector = styled.div`
    width: 192px; height: 131px;
    position: absolute;
    z-index: 2;
    cursor: pointer;
`;


const ThumbnailList = () => {
    const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
    const currentBookId = useBookViewerStore((state) => state.currentBookId);
    const currentPageCount = useBookViewerStore((state) => state.currentPageCount);
    const currentPageNumber = useBookViewerStore((state) => state.currentPageNumber);
    const currentViewMode = useBookViewerStore((state) => state.currentViewMode);
    const setCurrentClicked = useBookViewerStore((state) => state.setCurrentClicked);
    const setCurrentPageNumber = useBookViewerStore((state) => state.setCurrentPageNumber);

    const currentBookThumbnailData = bookPageThumbnailsData.find((book:BookThumbnails) => book.id === currentBookId);

    const spreadRefs = useRef<(HTMLDivElement | null)[]>(
        new Array(currentPageCount / 2 + 1).fill(null));
    // const thumbnailRefs = useRef<(HTMLDivElement | null)[]>(
    //     new Array(currentPageCount).fill(null));

    return (
        <Container>
            {/* 0 페이지 */}
            <SpreadContainer ref={(el) => (spreadRefs.current[0] = el)}>
                <Blank/>
                <Thumbnail 
                    // ref={(el) => (thumbnailRefs.current[0] = el)} 
                    backgroundImage={currentBookThumbnailData?.thumbnails[0]||""} 
                    pageNumber={0} 
                    currentPageNumber={currentPageNumber}
                    isArmAnimating={isArmAnimating}
                />
            </SpreadContainer>

            {currentBookThumbnailData?.thumbnails.slice(1, -1).map((url, pageNumber) => 
                pageNumber % 2 === 1 ? (
                    <SpreadContainer 
                        ref={(el) => (spreadRefs.current[(pageNumber + 1) / 2] = el)}
                        style={{filter: (pageNumber === currentPageNumber && currentViewMode === "spread") ? 'brightness(0.5)' : 'brightness(1)'}}
                    >
                        <Thumbnail 
                            // ref={(el) => (thumbnailRefs.current[pageNumber] = el)} 
                            backgroundImage={currentBookThumbnailData?.thumbnails[pageNumber]||""} 
                            pageNumber={pageNumber} 
                            currentPageNumber={currentPageNumber}
                            isArmAnimating={isArmAnimating}
                        />
                        <Thumbnail 
                            // ref={(el) => (thumbnailRefs.current[pageNumber + 1] = el)} 
                            backgroundImage={currentBookThumbnailData?.thumbnails[pageNumber + 1]||""} 
                            pageNumber={pageNumber + 1} 
                            currentPageNumber={currentPageNumber}
                            isArmAnimating={isArmAnimating}
                        />
                        <SpreadMouseDetector
                            style={{
                                display: currentViewMode === "spread" ? "flex": "none",
                            }}
                            onMouseEnter={() => {pageMouseEnter(spreadRefs.current[(pageNumber + 1) / 2])}}
                            onMouseLeave={() => {pageMouseLeave(spreadRefs.current[(pageNumber + 1) / 2])}}
                            onMouseDown={() => {pageMouseDown(spreadRefs.current[(pageNumber + 1) / 2])}}
                            onMouseUp={() => {
                                pageMouseUp(spreadRefs.current[(pageNumber + 1) / 2]);
                                if (!isArmAnimating) {
                                    setCurrentClicked("thumbnail");
                                    setCurrentPageNumber(pageNumber);
                                }
                            }}
                        />
                    </SpreadContainer>
                ) : null
            )}

            {/* 마지막 페이지 */}
            <SpreadContainer ref={(el) => (spreadRefs.current[currentPageCount / 2 + 1] = el)}>
                <Thumbnail 
                            // ref={(el) => (thumbnailRefs.current[currentPageCount - 1] = el)} 
                            backgroundImage={currentBookThumbnailData?.thumbnails[currentPageCount - 1]||""} 
                            pageNumber={currentPageCount - 1} 
                            currentPageNumber={currentPageNumber}
                            isArmAnimating={isArmAnimating}
                        />
                <Blank/>
            </SpreadContainer>
        </Container>
    );
}

export default ThumbnailList