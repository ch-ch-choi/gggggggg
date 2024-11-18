import { gsap } from 'gsap';

export const pageMount = (element, pageDirection) => {
    gsap.fromTo(element, 
        {x: 1440*pageDirection, y:0},
        {x: 0, y:0, duration: 0.4, ease: "power2.inOut"}
    );
};

export const pageUnMount = (element, pageDirection) => {
    gsap.fromTo(element,
        {x: 0, y:0},
        {x: -1440*pageDirection, y:0, duration: 0.4, ease: "power2.inOut"}
    );
};

export const pageSet = (element) => {
    gsap.to(element, {x: 0, y: 0, scale:1, duration: 0});
}

export const pageAppeared = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {scale:1.02, duration:0.06, ease: "power2.inOut"})
    .to(element, {scale: 1, duration:0.06, ease: "power2.inOut"});
}
export const pageDisappeared = (element) => {
    gsap.to(element, {scale:0.95, duration:0.09, ease: "power2.out"});
}