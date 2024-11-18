import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { bracketMouseDown, bracketMouseUp, bracketMouseEnter, bracketMouseLeave } from '../../animations/bracketClickAnimations';
import useKnobOnOffStore from '../../stores/knob_on_off_store';
import useBodyPageStore from '../../stores/body_page_store';
import usePageDirectionStore from '../../stores/page_direction_store';
import useIsArmAnimatingStore from '../../stores/is_arm_animating_store';
import { bracketLoading, bracketLoadingStandby } from '../../animations/headAnimations';

interface BracketRightProps {
    height: any;
    // linkRight: string;
}

const Container = styled.div`
    position: absolute;
    right: 0;
    z-index: 1;
`;

const BracketRight: React.FC<BracketRightProps> = ({height}) => {
    const pathData = `M0 0 H42 V${height} H0 V${height - 18} H24 V18 H0 V0 Z`;
    const btnRef = useRef<SVGPathElement | null>(null);
    const bracketRef = useRef(null);

    const setKorKnob = useKnobOnOffStore((state) => state.setKorKnobOnOff);
    const setEngKnob = useKnobOnOffStore((state) => state.setEngKnobOnOff);

    const korKnob = useKnobOnOffStore((state) => state.korKnobOnOff);
    const engKnob = useKnobOnOffStore((state) => state.engKnobOnOff);

    const turningKnobsOff = () => {korKnob === true ? setKorKnob(false) : null; engKnob === true ? setEngKnob(false) : null;};

    const bodyPage = useBodyPageStore((state) => state.bodyPage);
    const setBodyPage = useBodyPageStore((state) => state.setBodyPage);

    const setPageDirection = usePageDirectionStore((state) => state.setPageDirection);

    const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);

    useEffect(()=> {
        if(bracketRef.current){
            bracketLoadingStandby(bracketRef.current, 1);
            setTimeout(() => {
                bracketLoading(bracketRef.current, 1);
            },1700)
        }
    },[]);

    return(
        <Container ref={bracketRef}>
        <svg width="42" height={height} viewBox={`0 0 42 ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
            <path d={pathData} fill="black" ref={btnRef}/>
            <path d={pathData} fill="transparent" 
            onMouseEnter={() => bracketMouseEnter(btnRef.current)}
            onMouseLeave={() => bracketMouseLeave(btnRef.current)}
            onMouseDown={() => bracketMouseDown(btnRef.current)}
            onMouseUp={() => {
                bracketMouseUp(btnRef.current); 
                turningKnobsOff(); 
                if (!isArmAnimating){
                    {bodyPage !== 2 ? setBodyPage(bodyPage + 1) : null};
                    setPageDirection(1);
                }
            }}/>
        </svg>
        </Container>
    );
}

export default BracketRight;