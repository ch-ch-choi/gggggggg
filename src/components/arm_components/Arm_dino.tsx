import React from "react";

import Arm from "./Arm";
import styled from "styled-components";

const Dino = styled.iframe`
    position: absolute; 
    width: 100%; 
    height: 100%; 
    z-index: 999;
`;

const Arm_dino = () => {

    return(
        <Arm pageNumber="1">
            <Dino src="https://chromedino.com/" frameBorder="0" scrolling="no" width="100%" height="100%" loading="lazy"></Dino>
        </Arm>
    );
}

export default Arm_dino;