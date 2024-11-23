import styled from "styled-components";
import useBookViewerStore from "../../stores/book_viewer_store";
import { pageMouseDown, pageMouseEnter, pageMouseLeave, pageMouseUp } from "../../animations/pageClickAnimations";
import React, { useRef } from "react";

interface ThumbnailProps {
    pageNumber: number;
    backgroundImage: string;
    currentPageNumber: number;
    isArmAnimating: boolean;
}

const Container = styled.div`
    width: 96px; height: 131px;
    background-color: transparent;
    outline : 1px solid black;
    background-size: cover; // 이미지를 컨테이너에 맞춤
    background-position: center; // 이미지를 가운데 정렬
    z-index: 0;
    transition: filter 0.1s ease-in-out;
    cursor: pointer;
`;

const Thumbnail = ({backgroundImage, pageNumber, currentPageNumber, isArmAnimating}:ThumbnailProps) => {

        // const currentPageNumber = useBookViewerStore((state) => (state.currentPageNumber));
        // const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
        const setCurrentPageNumber = useBookViewerStore((state) => (state.setCurrentPageNumber));
        const setCurrentClicked = useBookViewerStore((state) => (state.setCurrentClicked));
        const currentViewMode =useBookViewerStore((state) => state.currentViewMode);
        const currentPageCount = useBookViewerStore((state) => state.currentPageCount);

        const thumbnailRef = useRef<HTMLDivElement>(null);

        const handleMouseEnter = () => {
            if (thumbnailRef.current) {
              const element = thumbnailRef.current;
              element.style.zIndex = "1";
              pageMouseEnter(element);
            }
        };
        const handleMouseLeave = () => {
            if (thumbnailRef.current) {
              const element = thumbnailRef.current;
              setTimeout(() => {
                element.style.zIndex = "0";
              });
              pageMouseLeave(element);
            }
        };
        const handleMouseUp = () => {
            if (thumbnailRef.current) {
              pageMouseUp(thumbnailRef.current);
            }
        };
        const handleMouseDown = () => {
            if (thumbnailRef.current) {
              pageMouseDown(thumbnailRef.current);
            }
          };
        const handleClick = () => {
            if (!isArmAnimating) {
              setCurrentClicked("thumbnail");
              setCurrentPageNumber(pageNumber);
            }
        };
      
        return (
            <Container
              ref={thumbnailRef}
              style={{
                backgroundImage: `url(${backgroundImage})`,
                filter: pageNumber === currentPageNumber && (currentViewMode === "page" || pageNumber===0 || pageNumber===currentPageCount-1)? "brightness(0.5)" : "brightness(1)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={handleClick}
            />
        );
    }

export default Thumbnail;