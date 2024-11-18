import styled from "styled-components";
import booksDataJSON from "../../../assets/data/books.json"
import useHoveredBookStore from "../../../stores/hovered_book_store"
import { useEffect, useRef } from "react";
import { bookCoverLoading, bookCoverLoadingStandby } from "../../../animations/headAnimations";

interface ContainerProps {
    coverImg: string | null;
}
interface Book {
    id: string;
    tags: {
      kor: string;
      eng: string;
    };
    date: string;
    name: string;
    coverBW: string;
    coverColor: string;
  }

const booksData = JSON.parse(JSON.stringify(booksDataJSON));

const Container = styled.div<ContainerProps>`
    width: 156px; height: 205px;
    border : 1px solid black;
    background-image: url(${(props) => props.coverImg});
`;

const BookCover = () => {
    const coverRef = useRef(null);

    const hoveredBookId = useHoveredBookStore((state) => state.hoveredBook)
    const hoveredBook = booksData.find((book: Book) => book.id === hoveredBookId);
    const hoveredBookCover = hoveredBook ? hoveredBook.coverBW : null;

    useEffect(() => {
        if(coverRef.current){
            bookCoverLoadingStandby(coverRef.current);
            setTimeout(() => {
                bookCoverLoading(coverRef.current);
            }, 1780);
        }
    },[])

    return (
        <Container coverImg={hoveredBookCover} ref={coverRef}/>
    )

}

export default BookCover;