import { gsap } from 'gsap';

export const bracketMouseEnter = (element) => {
  gsap.to(element, {
    scale: 1.02, duration: 0.2, ease:"power2.out", transformOrigin: "center center"
  });
};
export const bracketMouseDown = (element) => {
  gsap.to(element, {
    scale: 0.95, duration: 0.1, ease:"power2.out", transformOrigin: "center center"
  })
};
export const bracketMouseUp = (element) => {
  gsap.to(element, {
    keyframes: [
      {scale: 1.05, duration: 0.1, transformOrigin: "center center"},
      {scale: 1, duration: 0.1, transformOrigin: "center center"},
    ],
    ease: "power1.out"
  })
};
export const bracketMouseLeave = (element) => {
    gsap.to(element, {
        scale: 1, duration: 0.2, ease:"power2.out", transformOrigin: "center center"
      });
};
