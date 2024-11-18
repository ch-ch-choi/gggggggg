import styled from "styled-components";
import useBookStore from "../../stores/book_store";
import booksDataJSON from "../../assets/data/books.json";
import { useRef } from "react";
import { pageMouseDown, pageMouseEnter, pageMouseLeave, pageMouseUp } from "../../animations/pageClickAnimations";
import usePageDirectionStore from "../../stores/page_direction_store";
import useIsThumbnailClickedStore from "../../stores/is_thumbnail_clicked_store";
import useHoveredBookStore from "../../stores/hovered_book_store";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";

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

const booksData: Book[] = JSON.parse(JSON.stringify(booksDataJSON));

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
const ThumbnailContainer = styled.div`
    width: 160px; height: 218px;
    background-color: white;
    transition: filter 0.1s ease-in-out;
`;
const CoverThumbnail = styled(ThumbnailContainer)`
    width: 160px; height: 218px;
    border : 1px solid black;
    background-size: cover; // 이미지를 컨테이너에 맞춤
    background-position: center; // 이미지를 가운데 정렬
`;

const BookCoverThumbnails = () => {
    const setSelectedBookId = useBookStore((state) => state.setSelectedBookId);
    const selectedBookId = useBookStore((state) => state.selectedBookId);
    const setSelectedBookPages = useBookStore((state) => state.setSelectedBookPages);
    const coverRefs = useRef<(HTMLDivElement | null)[]>(new Array(booksData?.length).fill(null));
    const setBookPage = useBookStore((state) => state.setBookPage);
    const setPageDirection = usePageDirectionStore((state) => state.setPageDirection);
    const setIsThumbnailClicked = useIsThumbnailClickedStore((state) => state.setIsThumbnailClicked);
    const setHoveredBookId = useHoveredBookStore((state) => state.setHoveredBook);
    const setIsArmAnimating = useIsArmAnimatingStore((state) => state.setIsArmAnimating);

    return (
        <Container>
            {booksData?.map((book, index) => (
                <CoverThumbnail
                    key={book.id}
                    ref = {(el) => (coverRefs.current[index] = el)}
                    style={{ backgroundImage: `url(${book.coverColor})`, 
                        cursor: 'pointer', 
                        filter: (book.id === selectedBookId)? 'brightness(0.5)' : 'brightness(1)'
                    }}

                    onMouseEnter = {() => {pageMouseEnter(coverRefs.current[index]);}}
                    onMouseLeave = {() => {pageMouseLeave(coverRefs.current[index]);}}
                    onMouseUp = {() => {pageMouseUp(coverRefs.current[index]);}}
                    onMouseDown = {() => {pageMouseDown(coverRefs.current[index]);}}

                    onClick = {() => {
                        if(book.id === selectedBookId){
                            setIsThumbnailClicked(true);
                            setBookPage(0);
                            setTimeout(() => {
                                setIsThumbnailClicked(false);
                            },100);
                        }else{
                            setPageDirection(1);
                            setBookPage(-1);
                            setHoveredBookId(book.id);
                            setTimeout(() => {
                                setIsArmAnimating(true);
                            },1);
                            setTimeout(() => {
                                setSelectedBookId(book.id);
                                setSelectedBookPages(parseInt(book.pages));
                                setIsArmAnimating(false);
                            },400);
                            setTimeout(() => {
                                setBookPage(0);
                            },2600);// <- 이거 로딩애니메이팅 시간
                            setTimeout(() => {
                                setIsArmAnimating(true);
                            },2600+1);
                            setTimeout(() => {
                                setIsArmAnimating(false);
                            }, 2600 + 400);
                        }
                    }}
                />
            ))}
        </Container>
    );
};

export default BookCoverThumbnails;

