import { gsap } from 'gsap';

export const pageMouseEnter = (element) => {
  gsap.to(element, {
    scale: 1.1, duration: 0.2, ease:"power2.out"
  });
};
export const pageMouseDown = (element) => {
  gsap.to(element, {
    scale: 0.95, duration: 0.1, ease:"power2.out"
  })
};
export const pageMouseUp = (element) => {
  gsap.to(element, {
    keyframes: [
      {scale: 1.1, duration: 0.1},
      {scale: 1, duration: 0.1},
    ],
    ease: "power1.out"
  })
};
export const pageMouseLeave = (element) => {
    gsap.to(element, {
        scale: 1, duration: 0.2, ease:"power2.out"
      });
};
