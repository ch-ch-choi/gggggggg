import styled from "styled-components";
import useBookStore from "../../stores/book_store";
import { useEffect, useRef } from "react";
import bookPageThumbnailsDataJSON from "../../assets/data/book_page_thumbnails.json";
import { pageMouseDown, pageMouseEnter, pageMouseLeave, pageMouseUp } from "../../animations/pageClickAnimations";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import useIsThumbnailClickedStore from "../../stores/is_thumbnail_clicked_store";

interface BookThumbnails{
    id: string;
    thumbnails: string[];
}

const bookPageThumbnailsData: BookThumbnails[] = JSON.parse(JSON.stringify(bookPageThumbnailsDataJSON));

const Container = styled.div`
    width: 260px; height: 100%;
    padding: 42px 18px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px 0px;

    overflow: auto;
    scrollbar-width: none;
`;
const ThumbnailContainer = styled.div`
    width: 96px; height: 131px;
    background-color: transparent;
`;
const PageThumbnail = styled(ThumbnailContainer)`
    border : 1px solid black;
    background-size: cover; // 이미지를 컨테이너에 맞춤
    background-position: center; // 이미지를 가운데 정렬
    z-index: 0;
    transition: filter 0.1s ease-in-out;
`;

const BookPageThumbnails = () => {
    const selectedBookId = useBookStore((state) => state.selectedBookId);
    const bookPage = useBookStore((state) => state.bookPage);
    const setBookPage = useBookStore((state) => state.setBookPage);
    const selectedBookThumbnailData = bookPageThumbnailsData.find((book:BookThumbnails) => book.id === selectedBookId);
    const pageRefs = useRef<(HTMLDivElement | null)[]>(new Array(selectedBookThumbnailData?.thumbnails.length).fill(null));
    const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
    const setIsThumbnailClicked = useIsThumbnailClickedStore((state) => state.setIsThumbnailClicked);

    return (
        <Container>
            <ThumbnailContainer/>
            {selectedBookThumbnailData?.thumbnails.map((pageURL, page) => (
                <PageThumbnail
                    ref = {(el) => (pageRefs.current[page] = el)}
                    key={page}
                    style={{ backgroundImage: `url(${pageURL})`, 
                        cursor: 'pointer',
                        filter: (page === bookPage)? 'brightness(0.5)' : 'brightness(1)'
                    }}

                    onMouseEnter = {() => {
                        const currentPage = pageRefs.current[page];
                        if(currentPage){
                            currentPage.style.zIndex = '1'};
                        pageMouseEnter(currentPage); 
                    }}
                    onMouseLeave = {() => {
                        const currentPage = pageRefs.current[page];
                        setTimeout(() => {
                            if(currentPage){
                                currentPage.style.zIndex = '0'}
                        });
                        pageMouseLeave(currentPage); 
                    }}
                    onMouseUp = {() => pageMouseUp(pageRefs.current[page])}
                    onMouseDown = {() => pageMouseDown(pageRefs.current[page])}
                    onClick = {() => {
                        if(isArmAnimating === false){
                            setIsThumbnailClicked(true);
                            setBookPage(page);
                            setTimeout(() => {
                                setIsThumbnailClicked(false);
                            },100);
                        }
                    }}
                />
            ))}
            <ThumbnailContainer/>
        </Container>
    );
};

export default BookPageThumbnails;