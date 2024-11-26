import styled from "styled-components";
import { knobOn, knobOff, knobOpening, knobDisabled } from '../../animations/toggleKnobAnimations';
import knobKor from '../../assets/toggle_kor.png';
import knobEng from '../../assets/toggle_eng.png';
import { useEffect, useRef } from "react";
import useKnobOnOffStore from "../../stores/knob_on_off_store";
import useBodyPageStore from "../../stores/body_page_store";
import { knobLoading, knobLoadingStandby } from "../../animations/headAnimations";
import useBodyToLegStore from "../../stores/body_to_leg_store";
import { sideExit } from "../../animations/bodyToArmTransitionAnimations";
import useIsOpeningStore from "../../stores/is_opening_store";
interface CursorProps {
    enabled: boolean;
}
const Knob = styled.img<CursorProps>`
  width: 50px; height: 50px;
  position: absolute;
  right: 20px;
  cursor: ${({ enabled }) => (enabled ? "pointer" : "default")};
  transform: rotate(90deg);
`;
interface ToggleKnobProps {
    lang: string;
}
const ToggleKnob: React.FC<ToggleKnobProps> = ({lang}) => {
    const knobOnOff = useKnobOnOffStore((state) => lang === "kor" ? state.korKnobOnOff : state.engKnobOnOff);
    const setKnobOnOff = useKnobOnOffStore((state) => lang === "kor" ? state.setKorKnobOnOff : state.setEngKnobOnOff);
    const knobRef = useRef(null);
    const bodyPage = useBodyPageStore((state) => state.bodyPage);
    const knob = (lang === "kor") ? knobKor : knobEng;
    const bodyToLeg = useBodyToLegStore((state) => state.bodyToLeg);
    const isOpening = useIsOpeningStore((state) => state.isOpening);
    // 상태 변경 후 애니메이션 실행
    useEffect(() => {
        if (knobRef.current) {
            if (knobOnOff) {
                knobOn(knobRef.current);
            } else {
                knobOff(knobRef.current);
            }
        }
        console.log(knobOnOff);
    }, [knobOnOff]);

    //처음 로딩 시 실행될 애니메이션
    useEffect(() => {
        knobLoadingStandby(knobRef.current);
        setTimeout(() => {
            knobLoading(knobRef.current);
        }, 1700) // 오프닝 애니메이션 시간
        setTimeout(() => {
            knobOpening(knobRef.current);
        }, 2300) // 오프닝 애니메이션 시간 + 로고 애니메이션 시간, 이거 버튼이랑 같아야함
    },[])
    
    useEffect(() => {
        if(bodyToLeg){
          sideExit(knobRef.current,+1);
          setKnobOnOff(false);
        }
      }, [bodyToLeg]);

    const onClick = () => {
        
        if (bodyPage===0){
            if(!isOpening){
                setKnobOnOff(!knobOnOff); // 상태 반전
            }
        }else{
            knobDisabled(knobRef.current);
        }
    };

    // console.log(knobOnOff);
    return (
        <Knob enabled={!isOpening} ref={knobRef} src={knob} alt='토글버튼' onClick={onClick}/>
    );
}

export default ToggleKnob;