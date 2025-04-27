import styled from "styled-components";
import booksDataJSON from "../../../assets/data/books.json"
import useHoveredBookStore from "../../../stores/hovered_book_store"
import { useEffect, useRef } from "react";
import { bookCoverLoading, bookCoverLoadingStandby } from "../../../animations/headAnimations";
import useBodyToLegStore from "../../../stores/body_to_leg_store";
import { bookCoverTransition } from "../../../animations/bodyToArmTransitionAnimations";

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
    background-size: cover;
    background-position: center;
`;

const BookCover = ({location}:{location:string}) => {
    const coverRef = useRef(null);

    const hoveredBookId = useHoveredBookStore((state) => state.hoveredBook)
    const hoveredBook = booksData.find((book: Book) => book.id === hoveredBookId);
    const hoveredBookCover = hoveredBook ? hoveredBook.coverBW : null;

    const bodyToLeg = useBodyToLegStore((state) => state.bodyToLeg);

    const bodyOrLeg = location;

    useEffect(() => {
        if(coverRef.current){
            if(bodyOrLeg === "Body"){
            bookCoverLoadingStandby(coverRef.current);
            setTimeout(() => {
                bookCoverLoading(coverRef.current);
            }, 2760);
            }
        }
    },[])

    useEffect(() => {
        if(bodyToLeg && bodyOrLeg === "Body"){
        bookCoverTransition(coverRef.current);
        }
    },[bodyToLeg])

    return (
        <Container coverImg={hoveredBookCover} ref={coverRef}/>
    )

}

export default BookCover;