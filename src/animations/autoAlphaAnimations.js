import { gsap } from 'gsap';

export const autoAlpha = (element) => {
    gsap.to(element, {
        autoAlpha: 1,
        duration: 0
    })
}