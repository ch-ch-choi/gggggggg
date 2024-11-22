import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useBookViewerStore from "../../stores/book_viewer_store";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import usePageDirectionStore from "../../stores/page_direction_store";
import { pageAppeared, pageDisappeared, pageMount, pageSet, pageUnMount } from "../../animations/armTransitionAnimations";

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

    const currentClicked = useBookViewerStore((state) => state.currentClicked);
    const currentPageNumber = useBookViewerStore((state) => state.currentPageNumber);

    const setIsArmAnimating = useIsArmAnimatingStore((state) => state.setIsArmAnimating);
    const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
    const pageDirection = usePageDirectionStore((state) => state.pageDirection);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(containerRef.current){
            if (currentClicked === "bracket"){
                if(pageNumber === currentPageNumber && !isArmAnimating){
                    setIsArmAnimating(true);
                    setIsVisible(true);

                    pageSet(containerRef.current);
                    pageMount(containerRef.current, pageDirection);

                    setTimeout(() => {
                        setIsArmAnimating(false); // 애니메이션 완료 후 상태 변경
                    }, 400);
                }else if(pageNumber !== currentPageNumber && !isArmAnimating){
                    setIsArmAnimating(true);

                    pageSet(containerRef.current);
                    pageUnMount(containerRef.current, pageDirection);

                    setTimeout(() => {
                        setIsVisible(false);
                        setIsArmAnimating(false);
                    }, 400);
                }
            }else if(currentClicked === "thumbnail"){
                if(pageNumber === currentPageNumber && !isArmAnimating){
                    setIsArmAnimating(true);

                    pageSet(containerRef.current);

                    setTimeout(() => {
                        setIsVisible(true);
                        pageAppeared(containerRef.current);
                        setIsArmAnimating(false);
                    }, 90);
                }else if(pageNumber !== currentPageNumber && !isArmAnimating){
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
    },[currentPageNumber]);

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
