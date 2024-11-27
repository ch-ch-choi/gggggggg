import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Arm_home from "./Arm_home";
import Arm_credits from "./Arm_credits";
import Arm_dino from "./Arm_dino";
import Arm_ from "./Arm_";
import Arm_login from "./Arm_login";

const Container = styled.div`
    width: 960px; height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    overflow: hidden;
`;


const Arms = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if(containerRef.current){
            containerRef.current.style.overflow = "visible";
            setTimeout(() => {
                if(containerRef.current){
                    containerRef.current.style.overflow = 'hidden'
                }
            }, 1700); // 오프닝 애니메이션 시간 + 로고 애니메이션 시간
        }
    },[]);

    return(
        <Container ref = {containerRef}>
            <Arm_login/>
            <Arm_credits/>
            <Arm_home/>
            <Arm_dino/>
            <Arm_/>
        </Container>
    );
}

export default Arms;