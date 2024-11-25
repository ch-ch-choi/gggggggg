import styled from "styled-components";
import booksDataJSON from "../../assets/data/books.json";
import { useRef } from "react";
import useBookViewerStore from "../../stores/book_viewer_store";
import { pageMouseDown, pageMouseEnter, pageMouseLeave, pageMouseUp } from "../../animations/pageClickAnimations";
import useIsThumbnailClickedStore from "../../stores/is_thumbnail_clicked_store";
import usePageDirectionStore from "../../stores/page_direction_store";
import useHoveredBookStore from "../../stores/hovered_book_store";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import useIsOpeningStore from "../../stores/is_opening_store";

interface Book {
    id: string;
    tags: {
      kor: string;
      eng: string;
    };
    date: string;
    name: string;
    pages: string;
    coverBW: string;
    coverColor: string;
  }

const Container = styled.div`
    width: 260px; height: 100%;
    padding: 42px 18px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    overflow: auto;
    scrollbar-width: none;
`;

const Cover = styled.div`
    width: 160px; height: 218px;
    background-color: white;
    transition: filter 0.1s ease-in-out;
    outline: 1px solid black;
    cursor: pointer;
    background-size: cover;
    background-position: center;
`;

const booksData: Book[] = JSON.parse(JSON.stringify(booksDataJSON));

const CoverList = () => {
    const coverRefs = useRef<(HTMLDivElement | null)[]>(new Array(booksData?.length).fill(null));
    const currentBookId = useBookViewerStore((state) => state.currentBookId);
    const isOpening = useIsOpeningStore((state) => state.isOpening);
    const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
    const setCurrentBookId = useBookViewerStore((state) => state.setCurrentBookId);
    const setCurrentPageNumber = useBookViewerStore((state) => state.setCurrentPageNumber);
    const setPageDirection = usePageDirectionStore((state) => state.setPageDirection);
    const setHoveredBookId = useHoveredBookStore((state) => state.setHoveredBook);
    const setIsArmAnimating = useIsArmAnimatingStore((state) => state.setIsArmAnimating);
    const setCurrentPageCount = useBookViewerStore((state) => state.setCurrentPageCount);
    const setCurrentClicked = useBookViewerStore((state) => state.setCurrentClicked);

    return (
        <Container>
            {booksData?.map((book,index) => (
                <Cover
                    key={index}
                    ref = {(el) => (coverRefs.current[index] = el)}
                    style={{ backgroundImage: `url(${book.coverColor})`, 
                        cursor: 'pointer', 
                        filter: (book.id === currentBookId)? 'brightness(0.5)' : 'brightness(1)'
                    }}
                    onMouseEnter = {!isOpening ? () => {pageMouseEnter(coverRefs.current[index]);} : undefined}
                    onMouseLeave = {!isOpening ? () => {pageMouseLeave(coverRefs.current[index]);}: undefined}
                    onMouseUp = {!isOpening && !isArmAnimating ? () => {pageMouseUp(coverRefs.current[index]);}: undefined}
                    onMouseDown = {!isOpening && !isArmAnimating ? () => {pageMouseDown(coverRefs.current[index]);}: undefined}
                    onClick = {!isOpening && !isArmAnimating ? () => {
                        if(book.id === currentBookId){
                            setCurrentClicked("thumbnail");
                            setIsArmAnimating(true);
                            setCurrentPageNumber(0);
                            setTimeout(() => {
                                setIsArmAnimating(false);
                            },100);
                        }else{
                            setCurrentClicked("bracket");
                            setIsArmAnimating(true);
                            setHoveredBookId(book.id);
                            setPageDirection(1);
                            setCurrentPageNumber(-1);
                            setTimeout(() => {
                                setCurrentBookId(book.id);
                            },500);
                            // setPageDirection(1);
                            // setHoveredBookId(book.id);
                            // setCurrentPageNumber(-1);
                            // setTimeout(() => {
                            //     setIsArmAnimating(true);
                            // },1);
                            // setTimeout(() => {
                            //     setCurrentBookId(book.id);
                            //     setCurrentPageCount(parseInt(book.pages));
                            //     setIsArmAnimating(false);
                            // },400);
                            // setTimeout(() => {
                            //     setCurrentPageNumber(0);
                            // },2600);// <- 이거 로딩애니메이팅 시간
                            // setTimeout(() => {
                            //     setIsArmAnimating(true);
                            // },2600+1);
                            // setTimeout(() => {
                            //     setIsArmAnimating(false);
                            // }, 2600 + 400);
                        }
                    } : undefined}
                />
            ))}
        </Container>
    );
}

export default CoverList