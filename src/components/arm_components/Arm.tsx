import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useBodyPageStore from '../../stores/body_page_store';
import { pageMount, pageUnMount } from '../../animations/armTransitionAnimations';
import usePageDirectionStore from '../../stores/page_direction_store';
import useIsArmAnimatingStore from '../../stores/is_arm_animating_store';

const Container= styled.div`
    width: 960px; height: 100%;
    // background-color: teal;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
      @media (max-width: 1640px) {
      width: 880px;
    }
`;

interface ArmProps {
  pageNumber: string;
  children: React.ReactNode;
} 

const Arm: React.FC<ArmProps> = ({pageNumber, children}) => {
  const bodyPage = useBodyPageStore((state) => state.bodyPage);
  const armNumber = parseInt(pageNumber);
  const pageDirection = usePageDirectionStore((state) => state.pageDirection);
  const setIsArmAnimating = useIsArmAnimatingStore((state) => state.setIsArmAnimating);
  const isArmAnimating = useIsArmAnimatingStore((state) => state.isArmAnimating);
  const armRef = useRef<HTMLDivElement | null>(null);
  

  // 애니메이션 ㅋㅋㅋ
  useEffect(() => {
    if (armRef.current) {
      if (bodyPage === armNumber && !isArmAnimating) {
        setIsArmAnimating(true);
        armRef.current.style.display = 'flex'; // 요소 보이게 설정
        pageMount(armRef.current, pageDirection);
        setTimeout(() => {
          setIsArmAnimating(false); // 애니메이션 완료 후 상태 변경
        }, 400);
      } else {
        setIsArmAnimating(true);
        pageUnMount(armRef.current, pageDirection);
        setTimeout(() => {
          if (armRef.current) {
            armRef.current.style.display = 'none'; // 애니메이션이 끝난 후 요소 숨기기
            setIsArmAnimating(false);
          }
        }, 400);
      }
    }
  },[bodyPage]);


  // 처음 실행 시 Arm_home 빼고 나머지 다 안보이게 설정
  useEffect(() => {
    if(armRef.current){
      if (bodyPage !== 0){
        armRef.current.style.display = 'none';
      }else{
        armRef.current.style.display = 'flex';
      }
    }
  },[]);

  return (
      <Container ref={armRef}>
        {children}
      </Container>
  );
};

export default Arm;