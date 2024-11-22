import styled from "styled-components";
import useBookViewerStore from "../../stores/book_viewer_store";
import { pageMouseDown, pageMouseEnter, pageMouseLeave, pageMouseUp } from "../../animations/pageClickAnimations";
import React from "react";

interface ThumbnailProps {
    pageNumber: number;
    backgroundImage: string;
    currentPageNumber: number;
    isArmAnimating: boolean;
}

const Container = styled.div`
    width: 96px; height: 131px;
    background-color: transparent;
    border : 1px solid black;
    background-size: cover; // 이미지를 컨테이너에 맞춤
    background-position: center; // 이미지를 가운데 정렬
    z-index: 0;
    transition: filter 0.1s ease-in-out;
    cursor: pointer;
`;

const Thumbnail = React.forwardRef<HTMLDivElement, ThumbnailProps>(
    ({backgroundImage, pageNumber, currentPageNumber, isArmAnimating},ref) => {

        // const currentPageNumber = useBookViewerStore((state) => (state.currentPageNumber));
        // const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
        const setCurrentPageNumber = useBookViewerStore((state) => (state.setCurrentPageNumber));
        const setCurrentClicked = useBookViewerStore((state) => (state.setCurrentClicked));

        const handleMouseEnter = () => {
            if (ref && typeof ref === "object" && ref.current) {
              const element = ref.current;
              element.style.zIndex = "1";
              pageMouseEnter(element);
            }
        };
      
        const handleMouseLeave = () => {
            if (ref && typeof ref === "object" && ref.current) {
              const element = ref.current;
              setTimeout(() => {
                element.style.zIndex = "0";
              });
              pageMouseLeave(element);
            }
        };
      
        const handleMouseUp = () => {
            if (ref && typeof ref === "object" && ref.current) {
              pageMouseUp(ref.current);
            }
        };
      
        const handleMouseDown = () => {
            if (ref && typeof ref === "object" && ref.current) {
              pageMouseDown(ref.current);
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
              ref={ref}
              style={{
                backgroundImage: `url(${backgroundImage})`,
                filter: pageNumber === currentPageNumber ? "brightness(0.5)" : "brightness(1)",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={handleClick}
            />
        );
    }
)

export default Thumbnail;