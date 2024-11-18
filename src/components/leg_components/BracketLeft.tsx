import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import usePageDirectionStore from "../../stores/page_direction_store";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import { bracketMouseDown, bracketMouseUp, bracketMouseEnter, bracketMouseLeave } from '../../animations/bracketClickAnimations';
import useBookPageStore from "../../stores/book_store";
import { legBracketOpening } from "../../animations/legSideAnimations";


interface BracketProps {
    height: any;
}

const Container = styled.div`
    position: absolute;
    left: 0;
    z-index: 1;
`;

const BracketLeft: React.FC<BracketProps> = ({height}) => {
    const pathData = `M0 0 H42 V18 H18 V${height - 18}  H42 V${height}  H0 V0 Z`;
    const btnRef = useRef(null);
    
    const setPageDirection = usePageDirectionStore((state) => state.setPageDirection);
    const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);

    const bookPage = useBookPageStore((state) => state.bookPage);
    const setBookPage = useBookPageStore((state) => state.setBookPage);

    const [isSpreadView, setIsSpreadView] = useState(window.innerWidth > 768);

    useEffect(() => {
    const handleResize = () => {
        setIsSpreadView(window.innerWidth > 1440);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
    }, []);

    useEffect(() => {
        if (btnRef.current){
            
            legBracketOpening(btnRef.current, -1);
            setTimeout(() => {
                
            }, 1300);
        }
    }, []);

    return(
        <Container>
            <svg width="42" height={height} viewBox={`0 0 42 ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <path d={pathData} fill="black" ref={btnRef}/>
                <path d={pathData} fill="transparent"
                    onMouseEnter={() => bracketMouseEnter(btnRef.current)}
                    onMouseLeave={() => bracketMouseLeave(btnRef.current)}
                    onMouseDown={() => bracketMouseDown(btnRef.current)}
                    onMouseUp={() => {
                        bracketMouseUp(btnRef.current); 
                        if (!isArmAnimating && isSpreadView) {
                            {bookPage !== 0 ? setBookPage(bookPage - 2) : null};
                            setPageDirection(-1);
                        }else if (!isArmAnimating && !isSpreadView) {
                            {bookPage !== 0 ? setBookPage(bookPage - 1) : null};
                            setPageDirection(-1);
                        };
                    }}/>
            </svg>
        </Container>
    );
}

export default BracketLeft;
