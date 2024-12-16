import React, { useEffect, useRef } from "react";
import p5 from "p5";
import Arm from "./Arm";

const Arm_ = () => {

    const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // p5.js 스케치 정의
    const sketch = (p: p5) => {
      let x = 0;
      let y = 0;

      p.setup = () => {
        p.createCanvas(400, 400).parent(sketchRef.current!);
      };

      p.draw = () => {
        p.background(200);
        p.fill(50);
        p.ellipse(x, y, 50, 50);
        x += 1;
        y += 1;
        if (x > p.width) x = 0;
        if (y > p.height) y = 0;
      };

      p.mousePressed = () => {
        p.background(p.random(255), p.random(255), p.random(255));
      };
    };

    // p5.js 인스턴스 생성
    const p5Instance = new p5(sketch);

    // 컴포넌트 언마운트 시 p5.js 리소스 정리
    return () => {
      p5Instance.remove();
    };
  }, []);

    return(
        <Arm pageNumber="2">
            <div 
                style={{display:"flex", alignItems:'center', justifyContent:'center',width:'100%',height:'100%'}}
                ref={sketchRef}
            >
            </div>
        </Arm>
    );}

export default Arm_;