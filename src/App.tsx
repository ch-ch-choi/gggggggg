// App.tsx에서는 크게 두 가지 기능이 구현되어있음
// 1. 글로벌 스타일 (스타일 초기화 및 디폴트 값 설정)
// 2. 라우터 (머리 - 몸통 - 다리 사이 이동)

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Body from './components/body_components/Body';
import Leg from './components/leg_components/Leg';


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: pretendard, sans-serif;
    font-style: normal;
    font-weight: 100;
    line-height: 24px;

    user-select: none; /* 대부분의 브라우저 지원 */
    -webkit-user-select: none; /* Safari 및 구형 크롬 지원 */
    -moz-user-select: none; /* Firefox 지원 */
    -ms-user-select: none; /* 구형 Internet Explorer 지원 */

    -webkit-user-drag: none; /* 크롬, 사파리 등에서 이미지 드래그 방지 */
  }
  * {
  scrollbar-width: thin;
  }
  a {color: #000; text-decoration: none; outline: none} 
  a:hover, a:active {text-decoration: none; color:#000;}
`;
const App: React.FC = () => {
  document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // 오른쪽 클릭 방지
  });
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Routes>
          <Route path='/' element={<Body/>}/>
          <Route path='/viewer' element={<Leg/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
