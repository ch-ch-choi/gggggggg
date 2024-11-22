import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useBookViewerStore from "../../stores/book_viewer_store";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import usePageDirectionStore from "../../stores/page_direction_store";
import { pageAppeared, pageDisappeared, pageMount, pageSet, pageUnMount } from "../../animations/armTransitionAnimations";
import useIsOpeningStore from "../../stores/is_opening_store";

interface PageContainerProps {
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

const PageContainer = ({children, pageNumber}:PageContainerProps) => {

    const containerRef = useRef(null);

    const pageDirection = usePageDirectionStore((state) => state.pageDirection);
    const currentClicked = useBookViewerStore((state) => state.currentClicked);
    const currentPageNumber = useBookViewerStore((state) => state.currentPageNumber);
    const currentViewMode = useBookViewerStore((state) => state.currentViewMode);
    const setCurrentClicked = useBookViewerStore((state) => state.setCurrentClicked);
    const setCurrentPageNumber = useBookViewerStore((state) => state.setCurrentPageNumber);
    const isOpening = useIsOpeningStore((state) => state.isOpening);
    const setIsArmAnimating = useIsArmAnimatingStore((state) => state.setIsArmAnimating);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(containerRef.current){
            if (currentClicked === "bracket"){
                if(pageNumber === currentPageNumber){
                    if(pageNumber===-1 && isOpening){
                        setIsVisible(true);
                    }else{
                    setIsVisible(true);
                    pageSet(containerRef.current);
                    pageMount(containerRef.current, pageDirection);
                    }
                }else if(pageNumber !== currentPageNumber){
                    pageSet(containerRef.current);
                    pageUnMount(containerRef.current, pageDirection);
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 400);
                }
            }else if(currentClicked === "thumbnail"){
                if(pageNumber === currentPageNumber){
                    pageSet(containerRef.current);
                    setTimeout(() => {
                        setIsVisible(true);
                        pageAppeared(containerRef.current);
                    }, 90);
                }else if(pageNumber !== currentPageNumber){
                    pageSet(containerRef.current);
                    pageDisappeared(containerRef.current);
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 90);
                }
            }

        }
    },[currentPageNumber]);

    // useEffect(() => {
    //     if(pageNumber === currentPageNumber + 1 && currentViewMode === "page"){
    //         setIsVisible(false);
    //     }
    // }, [currentViewMode])

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

export default PageContainer
