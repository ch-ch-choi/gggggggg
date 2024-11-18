import styled from "styled-components";
import loadingGif from "../../assets/loading_gif.gif"
import { useEffect, useState } from "react";
import useHoveredBookStore from "../../stores/hovered_book_store";

const LoadingGif = styled.img`
    width: 160px; height: auto;


`;

const Container = styled.div`
    width: 160px; height: 120px;
    margin-top: 8px;
`;

const LoadingAnimation = () => {
    const hoveredBookId = useHoveredBookStore((state) => state.hoveredBook);
    const [src, setSrc] = useState(loadingGif);

    useEffect(() => {
        if (hoveredBookId) {
            setSrc(loadingGif); // hoveredBookId가 변경될 때 GIF를 설정
            const timer = setTimeout(() => {
                setSrc(""); // 일정 시간 후 GIF를 지움
            }, 2600 + 400);

            return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 클리어
        }
    }, [hoveredBookId]);

    return (
        <Container>
            <LoadingGif src={src} alt="loading gif"/>
        </Container>
    );
};

export default LoadingAnimation;