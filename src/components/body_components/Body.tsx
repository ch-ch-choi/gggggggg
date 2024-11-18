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

  useEffect(() => {
    titleLoadingStandby(titleRef.current)
    setTimeout(() => {
      titleLoading(titleRef.current);
    }, 1700);

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
  }, []); // 빈 배열 사용 - 컴포넌트가 처음 렌더링될 때만 실행 

  return (
    <>
    <Head/>
    <Wrapper headerHeight='96px'>
      <Header height="96px">
        <Title src={title} alt='꿈끼깡꾀' ref={titleRef}/>
        <LetterBtnsKor/>
        <ToggleKnob lang="kor"/>
      </Header>
      <Main ref={mainRef} maxHeight='1920px' spanNumber={3} router='body'>
          <BracketLeft height={mainHeight}/>
          <Arms/>
          <BracketRight height={mainHeight}/>
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
  