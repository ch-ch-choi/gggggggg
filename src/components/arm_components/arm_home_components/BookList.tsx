import react, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLetterLogoStore } from '../../../stores/letter_logo_store';
import booksDataJSON from '../../../assets/data/books.json';
import lettersDataJSON from '../../../assets/data/letters.json';
import indecator from '../../../assets/indicator.png';
import useHoveredBookStore from '../../../stores/hovered_book_store';
import { bookListLoading, bookListLoadingStandby } from '../../../animations/headAnimations';
import { Link, useNavigate } from 'react-router-dom';
import useBookViewerStore from '../../../stores/book_viewer_store';
import useIsOpeningStore from '../../../stores/is_opening_store';

const booksData = JSON.parse(JSON.stringify(booksDataJSON));
const lettersData = JSON.parse(JSON.stringify(lettersDataJSON));

const Container = styled.div`
    height: 205px; width: 182px;
    overflow : auto;
    display: flex;
    gap: 6px;
`;
const BookIndicator = styled.div``;
const BookId = styled.div`
    cursor: pointer;
`;
const BookDate = styled.div`
    cursor: pointer;
`;
const BookName = styled.div`
    cursor: pointer;
`;

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
const BookList = () => {
    const letterNumber = useLetterLogoStore((state) => state.letterNumber);
    const tag:string = lettersData[letterNumber].tag;
    const filteredBooks = booksData.filter((book: Book) => Object.values(book.tags).includes(tag)); 
    const listRef = useRef(null);

    const hoveredBookId = useHoveredBookStore((state) => state.hoveredBook);
    const setHoveredBookId = useHoveredBookStore((state) => state.setHoveredBook);
    
    const setCurrentBookId = useBookViewerStore((state) => state.setCurrentBookId);
    const setIsOpening = useIsOpeningStore((state) => state.setIsOpening);
    const setCurrentPageNumber = useBookViewerStore((state) => state.setCurrentPageNumber);

    const navigate = useNavigate();

    const handleMouseEnter = (id: string) => {
        setHoveredBookId(id);
    };

    const onClick = () => {
        setCurrentBookId(hoveredBookId);
        setIsOpening(true);
        setCurrentPageNumber(-1);

        // 애니메이션 여기다가.

        setTimeout(() => {
            navigate("/viewer");
          }, 2000);
    };

    useEffect(()=>{
        if(listRef.current){
            bookListLoadingStandby(listRef.current);
            setTimeout(() => {
                bookListLoading(listRef.current);
            }, 1700);
        }
    },[]);

    return (
        <Container ref = {listRef}>
            <BookIndicator>
                <ol>
                    {filteredBooks.map((book: Book) => (
                        <li>
                            <img id={book.id} src={indecator} style={{ opacity: hoveredBookId === book.id ? '1' : '0' }} alt=''>
                            </img>
                        </li>
                    ))}
                </ol>
            </BookIndicator>
            <BookId>
                <ol>
                    {filteredBooks.map((book: Book) => (
                            <li id={book.id} onMouseEnter={() => handleMouseEnter(book.id)} onClick={onClick}>{book.id}</li>
                    ))}
                </ol>
            </BookId>
            <BookDate>
                <ol>
                    {filteredBooks.map((book: Book) => (
                            <li id={book.id} onMouseEnter={() => handleMouseEnter(book.id)} onClick={onClick}>{book.date}</li>
                    ))}
                </ol>
            </BookDate>
            <BookName>
                <ol>
                    {filteredBooks.map((book: Book) => (
                            <li id={book.id} onMouseEnter={() => handleMouseEnter(book.id)} onClick={onClick}>{book.name}</li>
                    ))}
                </ol>
            </BookName>
        </Container>
    ); 
}

export default BookList;