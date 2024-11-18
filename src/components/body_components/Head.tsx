import { useEffect, useRef } from "react";
import styled from "styled-components";
import { headLoading } from "../../animations/headAnimations";
// import openingGif from "";


const Gif = styled.div`
    width: 100%; height: 100vh;
    background-color: teal;
    position: absolute;
    z-index: 2;

`;

const Head = () => {
    const gifRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(gifRef.current){
            headLoading(gifRef.current);
            setTimeout(() =>{
                if(gifRef.current){
                    gifRef.current.style.display = 'none';
                }
            }, 1900);
        }
    },[]);

    return(
        <Gif ref = {gifRef} />
    );
}

export default Head;