import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import title from '../../assets/gggg_char_icon.svg';
import BracketLeft from './BracketL';
import BracketRight from './BracketR';
import ToggleKnob from './ToggleKnob';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Arms from "../arm_components/Arms";
import Wrapper from './Wrapper';
import Head from './Head';
import { LetterBtnsKor, LetterBtnsEng } from './LetterBtns';
import { titleLoading, titleLoadingStandby } from '../../animations/headAnimations';
import useBodyToLegStore from '../../stores/body_to_leg_store';
import { sideExit } from '../../animations/bodyToArmTransitionAnimations';
import useIsOpeningStore from '../../stores/is_opening_store';
import { autoAlpha } from '../../animations/autoAlphaAnimations';
////////////////////////////////////////////////////////////////////////
const Title = styled.img`
  width: 160px; 
  height: 40px;
  position: absolute;
  left: 24px;
`;
//////////////////////////////////////////////////////////////////////////
const Body = () => {
  const [mainHeight, setMainHeight] = useState<number | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const bodyToLeg = useBodyToLegStore((state) => state.bodyToLeg);
  const setIsOpening = useIsOpeningStore((state) => state.setIsOpening);
  const isOpening = useIsOpeningStore((state) => state.isOpening);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    titleLoadingStandby(titleRef.current)
    setTimeout(() => {
      titleLoading(titleRef.current);
    }, 1700);

    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 4300)

    // 창 크기 변경 시 호출되는 함수 정의
    const handleResize = () => {
      if (mainRef.current) {
        setMainHeight(mainRef.current.offsetHeight);
      }
    };
    // 초기 높이 설정
    handleResize();
    // 'resize' 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };


  }, []); 

  // 전환 애니메이션
  useEffect(() => {
    if(bodyToLeg){
      sideExit(titleRef.current,-1);
      setTimeout(() => {
        if(mainRef.current){
            mainRef.current.style.width = "100%";
        }
      }, 400)
    }
  }, [bodyToLeg]);

  useEffect(() => {
    console.log(isOpening);
  }, [isOpening])

  autoAlpha(wrapperRef.current);

  return (
    <>
    <Head/>
    <Wrapper ref={wrapperRef} headerHeight='96px'>
      <Header height="96px">
        <Title src={title} alt='꿈끼깡꾀' ref={titleRef}/>
        <LetterBtnsKor/>
        <ToggleKnob lang="kor"/>
      </Header>
      <Main ref={mainRef} maxHeight='1920px' spanNumber={3} router='body'>
          <BracketLeft  height={mainHeight}/>
          <Arms/>
          <BracketRight  height={mainHeight}/>
      </Main>
      <Footer height="96px">
        <LetterBtnsEng/>
        <ToggleKnob lang="eng"/>
      </Footer>
    </Wrapper>
    </>
  );
}

export default Body;
  