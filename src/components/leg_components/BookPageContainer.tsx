import styled from "styled-components";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import usePageDirectionStore from "../../stores/page_direction_store";
import { useEffect, useRef, useState } from "react";
import { pageAppeared, pageDisappeared, pageMount, pageSet, pageUnMount } from "../../animations/armTransitionAnimations";
import useBookStore from "../../stores/book_store";
import useIsThumbnailClickedStore from "../../stores/is_thumbnail_clicked_store";

interface BookPageContainerProps {
    children: React.ReactNode;
    pageNumber: number;
}

const Container = styled.div<{ pageNumber: number }>`
    width: 100%; height: 100%;
    display: flex;
    flex-direction: ${(props) => props.pageNumber === -1 ? "column" : "row" };
    align-items: center;
    justify-content: center;
    padding: 32px;
    position: absolute;
`;

const BookPageContainer = ({children, pageNumber}:BookPageContainerProps) => {

    const setIsArmAnimating = useIsArmAnimatingStore((state) => state.setIsArmAnimating);
    const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
    const pageDirection = usePageDirectionStore((state) => state.pageDirection);
    const bookPage = useBookStore((state) => state.bookPage);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const isThumbnailClicked = useIsThumbnailClickedStore((state) => state.isThumbnailClicked);

    useEffect(() => {
        if(containerRef.current){
            if (!isThumbnailClicked){
                if(pageNumber === bookPage && !isArmAnimating){
                    setIsArmAnimating(true);
                    pageSet(containerRef.current);
                    setIsVisible(true);
                    pageMount(containerRef.current, pageDirection);
                    setTimeout(() => {
                        setIsArmAnimating(false); // 애니메이션 완료 후 상태 변경
                    }, 400);
                }else if(pageNumber !== bookPage && !isArmAnimating){
                    setIsArmAnimating(true);
                    pageSet(containerRef.current);
                    pageUnMount(containerRef.current, pageDirection);
                    setTimeout(() => {
                        setIsVisible(false);
                        setIsArmAnimating(false);
                    }, 400);
                }
            }else{
                if(pageNumber === bookPage && !isArmAnimating){
                    setIsArmAnimating(true);
                    pageSet(containerRef.current);
                    setTimeout(() => {
                        setIsVisible(true);
                        pageAppeared(containerRef.current);
                        setIsArmAnimating(false);
                    }, 90);
                }else if(pageNumber !== bookPage && !isArmAnimating){
                    setIsArmAnimating(true);
                    pageSet(containerRef.current);
                    pageDisappeared(containerRef.current);
                    setTimeout(() => {
                        setIsVisible(false);
                        setIsArmAnimating(false);
                    }, 90);
                }
            }

        }
    },[bookPage]);

    return(
        <Container 
            ref = {containerRef}
            pageNumber={pageNumber}
            style={{ display: isVisible ? 'flex' : 'none' }}
        >
            {children}
        </Container>  
    );
}

export default BookPageContainer;