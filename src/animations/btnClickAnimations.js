import { gsap } from 'gsap';

export const btnMouseEnter = (element) => {
  gsap.to(element, {
    scale: 1.3, duration: 0.2, ease:"power2.out"
  });
};
export const btnMouseDown = (element) => {
  gsap.to(element, {
    scale: 0.9, duration: 0.1, ease:"power2.out"
  })
};
export const btnMouseUp = (element) => {
  gsap.to(element, {
    keyframes: [
      {scale: 1.3, duration: 0.1},
      {scale: 1, duration: 0.1},
    ],
    ease: "power1.out"
  })
};
export const btnMouseLeave = (element) => {
    gsap.to(element, {
        scale: 1, duration: 0.2, ease:"power2.out"
      });
};
