import { useEffect, useRef } from "react";
import styled from "styled-components";
// import { headLoading } from "../../animations/headAnimations";

const Intro = styled.div`
    width: 100%; height: 100vh;
    position: absolute;
    z-index: 2;
`;

const BackgroundVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Head = () => {
    const introRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(introRef.current){
            // headLoading(introRef.current);
            setTimeout(() =>{
                if(introRef.current){
                    introRef.current.style.display = 'none';
                }
            }, 2630);
        }
    },[]);

    return(
        <Intro ref = {introRef}>
            <BackgroundVideo autoPlay muted>
                <source src="/gggg_intro.mp4" type="video/mp4"></source>
            </BackgroundVideo>
        </Intro>
    );
}

export default Head;