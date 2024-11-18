import { useRef } from "react";
import styled from "styled-components";

const Svg = styled.svg`
    position: absolute;
    top: 0;
    overflow: visible;
    z-index: 2;
`;

const Path = styled.path`
`;
const BracketTop = () => {
    const pathData = `M0 0 H260 V42 H242 V18 H18 V42 H0 V0 Z`;
    const btnRef = useRef(null);

    return(
        <Svg width="260" height="42" viewBox={`0 0 260 42`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d={pathData} fill="black" ref={btnRef}/>
        </Svg>
    );
}

export default BracketTop;
