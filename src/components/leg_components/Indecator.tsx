import { useEffect, useRef } from "react";
import styled from "styled-components";
import { indecatorOpening } from "../../animations/legSideAnimations";

interface IndecatorProps {
    pathData: string;
    position: number;
}

interface ContainerProps {
    position: number;
}

const Container = styled.div<ContainerProps>`
    position: absolute;
    ${(props) => props.position === 1 ? `right: 0px` : `left: 0px`};
    top: calc(50% - 24px);
    opacity:0;
`;

const Indecator = ({pathData, position}:IndecatorProps) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            indecatorOpening(containerRef.current, position);
        }
    }, []);

    return (
        <Container position={position} ref={containerRef}>
            <svg width="24px" height="48px" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={pathData} fill="black"/>
            </svg>
        </Container>
    );
};

export default Indecator;
