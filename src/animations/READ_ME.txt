아 따이
애니메이션들임
따이

대충 gsap에서 애니메이션은 하나의 함수의 형태임.
그래서 export 랑 import가 용이함.
예를 들어

export const bracketMouseEnter = (element) => {
  gsap.to(element, {
    scale: 1.02, duration: 0.2, ease:"power2.out", transformOrigin: "center center"
  });
};

이런식으로 써놓고

useRef를 사용해서 저기 저 element를 통해 컴포넌트와 애니메이션을 연결시키면 작동하는 방식임. 