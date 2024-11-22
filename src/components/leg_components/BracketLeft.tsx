import { useEffect, useRef } from "react";
import styled from "styled-components";
import usePageDirectionStore from "../../stores/page_direction_store";
import useIsArmAnimatingStore from "../../stores/is_arm_animating_store";
import { bracketMouseDown, bracketMouseUp, bracketMouseEnter, bracketMouseLeave } from '../../animations/bracketClickAnimations';
import { legBracketOpening } from "../../animations/legSideAnimations";
import useBookViewerStore from "../../stores/book_viewer_store";


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
    
    const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
    const currentPageNumber = useBookViewerStore((state) => state.currentPageNumber);
    const currentViewMode = useBookViewerStore((state) => state.currentViewMode);
    const setCurrentClicked = useBookViewerStore((state) => state.setCurrentClicked);
    const setCurrentPageNumber = useBookViewerStore((state) => state.setCurrentPageNumber);
    const setPageDirection = usePageDirectionStore((state) => state.setPageDirection);

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
                        setCurrentClicked("bracket");
                        setPageDirection(-1);

                        if (!isArmAnimating && currentPageNumber !== 0){
                            if (currentViewMode === "page") {
                                setCurrentPageNumber(currentPageNumber - 1)
                            } else if (currentViewMode === "spread") {
                                if (currentPageNumber === 1){
                                    setCurrentPageNumber(currentPageNumber - 1)
                                } else {
                                    setCurrentPageNumber(currentPageNumber - 2)
                                }
                            }
                        }
                    }}/>
            </svg>
        </Container>
    );
}

export default BracketLeft;
