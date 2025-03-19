import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLetterLogoStore } from '../../stores/letter_logo_store';
import lettersJSON from '../../assets/data/letters.json';
import BookCover from './arm_home_components/BookCover';
import BookList from './arm_home_components/BookList'
import Arm from './Arm';
import { logoLoading, logoLoadingStandby } from '../../animations/headAnimations';
import useBodyToLegStore from '../../stores/body_to_leg_store';
import { logoTransition } from '../../animations/bodyToArmTransitionAnimations';

interface Letter {
    tag: string;
    language: string;
    letterNumber: number;
    letterBtn: string;
    letterLogo: string;
  }

const letters:Letter[] = JSON.parse(JSON.stringify(lettersJSON));
const Logo = styled.img`
    width: 152px; height: 152px;
    z-index: -1;
`;
const Book = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 80px;
`;

const Arm_home = () => {
    const letterNumber = useLetterLogoStore((state) => state.letterNumber);
    const letterLogo = letters[letterNumber].letterLogo;
    const logoRef = useRef(null);

    const bodyToLeg = useBodyToLegStore((state) => state.bodyToLeg);

    useEffect(() => {
        logoLoadingStandby(logoRef.current);
        // logoRef.current.style.display = 'flex'; // 요소 보이게 설정
        setTimeout(() => {
            logoLoading(logoRef.current);
        }, 2580); // 오프닝 애니메이션 시간
    }, []);

    useEffect(() => {
        if(bodyToLeg){
        logoTransition(logoRef.current);
        }
    },[bodyToLeg])

    return (
        <Arm pageNumber='0'>
            <Logo src={letterLogo} ref = {logoRef}/>
            <Book>
                <BookCover location="Body"/>
                <BookList/>
            </Book>
        </Arm>
    );
};

export default Arm_home;