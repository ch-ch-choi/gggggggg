import styled from "styled-components";
import useBookStore from "../../stores/book_store";
import bookPagesDataJSON from "../../assets/data/book_pages.json"
import { useEffect, useRef, useState } from "react";
import LoadingAnimation from "./LoadingAnimation";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import { pageMount, pageUnMount } from "../../animations/armTransitionAnimations";
import usePageDirectionStore from "../../stores/page_direction_store";
import BookPageContainer from "./BookPageContainer";
import BookCover from "../arm_components/arm_home_components/BookCover";

interface BookPage {
    id: string;
    pages: string[];
}

const bookPagesData: BookPage[] = JSON.parse(JSON.stringify(bookPagesDataJSON));

const Container = styled.div`
    width: 100%; height: 100%;
    display: flex;
    flex-shrink: 0;
    position: relative;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;


const Page = styled.img`
    /* background-color: teal; */
    height: 100%; width: auto;
    max-width: 100%;
    max-height: max-content;
    outline : 2px solid black;
    /* object-fit: contain; */
`;


const BookPage = () => {
    const selectedBookId = useBookStore((state) => state.selectedBookId);
    const selectedBookPagesData = bookPagesData.find((bookPage: BookPage) => bookPage.id === selectedBookId);


    const [isSpreadView, setIsSpreadView] = useState(window.innerWidth > 768);

    useEffect(() => {
    const handleResize = () => {
        setIsSpreadView(window.innerWidth > 1440);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
    }, []);

    if (!selectedBookPagesData) {
        return null; // 선택된 책이 없을 경우 아무것도 렌더링하지 않음
      }

    //BookPageContainer pageNumber={-1} 의 애니메이션에 대한 내용은 BookCoverThumbnail에 있음

    return (
        <Container>
            <BookPageContainer pageNumber={-1}>
                <BookCover/>
                <LoadingAnimation/>
            </BookPageContainer>
            {isSpreadView ? (
                <>
                <BookPageContainer pageNumber={0}>
                    <Page src={selectedBookPagesData?.pages[0]} alt="page0"/>
                </BookPageContainer>
                {selectedBookPagesData?.pages.slice(1, -1).map((page, index) => {
                    // 첫 번째와 마지막 페이지 제외
                    if (index % 2 === 0) {
                        return (
                            <BookPageContainer key={index} pageNumber={index + 1}>
                                <Page src={page} alt={`page${index}`} style={{maxWidth: "50%"}}/>
                                {selectedBookPagesData?.pages[index + 2] && (
                                    <Page
                                        src={selectedBookPagesData?.pages[index + 2]}
                                        alt={`page${index + 1}`}
                                        style={{maxWidth: "50%"}}
                                        />
                                )}
                            </BookPageContainer>
                        );
                    }
                    return null;
                })}
                <BookPageContainer pageNumber={(selectedBookPagesData?.pages.length) - 1}>
                    <Page 
                        src={selectedBookPagesData?.pages[selectedBookPagesData.pages.length - 1]} 
                        alt={`page${selectedBookPagesData?.pages.length -1}`}
                    />
                </BookPageContainer>
                </>
                ) : 
                (selectedBookPagesData?.pages.map((page, index) => (
                    <BookPageContainer
                        key={index}
                        pageNumber = {index}
                    >
                    <Page
                        src={page}
                        alt={`page${index}`}
                    />
                    </BookPageContainer>
                )))
            }
        </Container>
    );
}

export default BookPage;