import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { legSideMouseEnter, legSideMouseLeave, legSideOpening, legSideStandby } from "../../animations/legSideAnimations";
import useBookStore from "../../stores/book_store";
import useHoveredBookStore from "../../stores/hovered_book_store";
import gsap from "gsap";

interface SideProps {
    maxHeight: string;
    position: number;
    children: React.ReactNode;
}

const Container = styled.div<{maxHeight: string}>`
    width: 260px;
    min-height: 480px;
    max-height: ${(props) => props.maxHeight};
    margin: 0 20px;

    position: relative;
    /* display: flex;
    justify-content: center; */
    /* background-color: teal; */

`;

const MouseContainer = styled.div<{maxHeight: string, position: number}>`
    width: 260px; height: calc(100% - 96px - 96px);
    min-height: 480px;
    max-height: ${(props) => props.maxHeight};
    /* margin: ${(props) => props.position === 1 ? "0 20px 0 0" : "0 0 0 20px"}; */
    
    position: absolute;
    top: 96px;
    right: ${(props) => props.position === 1 ? 0 : null};
    left: ${(props) => props.position === 1 ? null : 0};
`;

const Side = ({maxHeight, position, children}: SideProps) => {
    const sideRef = useRef(null);
    const [sideDisabled, setSideDisabled] = useState(true);
    const hoveredBookId = useHoveredBookStore((state) => state.hoveredBook);

    useEffect(() => {
        if (sideRef.current) {
          setSideDisabled(true);
          legSideOpening(sideRef.current, position);
          setTimeout(() => {
            setSideDisabled(false);
        }, 1300);
        }
      }, []);

    useEffect(() => {
        if (sideRef.current){
            setSideDisabled(true);
            legSideMouseLeave(sideRef.current, position);
            setTimeout(() => {
                setSideDisabled(false);
            }, 2600 + 400); // <- 이거 로딩 애니메이션 시간
        }
    },[hoveredBookId]);

    return (
        <>
            <MouseContainer
                position = {position}
                maxHeight={maxHeight} 
                onMouseEnter={() => (!sideDisabled)?legSideMouseEnter(sideRef.current):null} 
                onMouseLeave={() => (!sideDisabled)?legSideMouseLeave(sideRef.current, position):null} 
            />
            <Container 
                ref = {sideRef} 
                maxHeight={maxHeight}
                onMouseEnter={() => (!sideDisabled)?legSideMouseEnter(sideRef.current):null} 
                onMouseLeave={() => (!sideDisabled)?legSideMouseLeave(sideRef.current, position):null} 
            >
                {children}
            </Container>
        </>
    );
}

export default Side;