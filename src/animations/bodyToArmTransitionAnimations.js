import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';

export const sideExit = (element,direction) => {
    gsap.to(element, {
        x: 200*direction,
        duration: 0.4,
        ease: "power2.out"
    })
}

export const bracketTransition = (element, bracketDirection) => {
    const parent = element.parentElement;
    const parentBounds = parent.getBoundingClientRect();
    const elementBounds = element.getBoundingClientRect();
    
    const targetPosition =
        bracketDirection === 1 ?
            parentBounds.right - 260 - elementBounds.width :
            parentBounds.left + 260;

    gsap.to(element, {
        x: targetPosition - elementBounds.left,
        duration: 0.4,
        ease: "power1.out"
    });
};

export const bookCoverTransition = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {x: -15, duration: 0.4, ease: "power2.out"})
    .to(element, {x: 97, duration: 0.05, ease: "power2.in"}, "+=0.2")
    .to(element, {y: 20, duration: 0.05, ease: "power2.out"})
    .to(element, {y: -100, duration: 0.1, ease: CustomEase.create("custom", "M0,0 C0.23,0 0.294,0.398 0.4,0.6 0.511,0.816 0.699,1 1,1 ")})
}

export const bookListTransition = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {x: 15, duration: 0.4, ease: "power2.out"})
    .to(element, {x: -97, duration: 0.05, opacity:0 ,ease: "power2.in"}, "+=0.2")
}

export const logoTransition = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {rotate: 10, y: -5, scale:1.1, duration: 0.5, ease: "power1.out"})
    .to(element, {rotate:0, y: 100, scale: 1,duration: 0.05, opacity:0 ,ease: "power2.in"},"+=0.1")
}