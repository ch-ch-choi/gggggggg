import gsap from "gsap";

export const legSideStandby = (element, position) => {
    gsap.to(element, {x: 280*position})
}
export const legSideOpening = (element, position) => {
    const tl = gsap.timeline();
    tl.fromTo(element, {x: 280*position}, {x: 90*position, duration: 0.2, ease: 'power1.out'})
    .to(element, {x: 100*position, duration: 0.1, ease: 'power1.inOut'})
    .to(element, {x: 280*position, duration: 0.3, ease: 'power1.in'}, "+=0.7")
}
export const legSideMouseEnter = (element) => {
    gsap.to(element, {x: 0, duration: 0.2, ease: 'power2.out'})
}
export const legSideMouseLeave = (element, position) => {
    gsap.to(element, {x: 280*position, duration: 0.2, ease: 'power2.in'});
}

export const legBracketOpening = (element,position) => {
    const tl = gsap.timeline();
    tl.to(element, {x: 10*position , duration: 0.2, ease: 'power1.out', transformOrigin: "center center"})
      .to(element, {x: 0 , duration: 0.1, ease: 'power1.inOut'})
      .to(element, {scale: 1.02 , duration: 0.075, ease: 'power1.out', transformOrigin: "center center"}, "+=0.2")
      .to(element, {scale: 1 , duration: 0.075, ease: 'power1.in'})
      .to(element, {scale: 1.02 , duration: 0.075, ease: 'power1.out'})
      .to(element, {scale: 1 , duration: 0.075, ease: 'power1.in'})
      .to(element, {x: -10*position, duration: 0.1, ease: 'power1.out'},"+=0.5")
      .to(element, {x: 0 , duration: 0.1, ease: 'power1.inOut'})
}

export const legLogoOpening = (element) => {
    const tl = gsap.timeline();
    tl.fromTo(element, {y: 120}, {y:-10, duration: 0.2, ease: 'power1.out'})
      .to(element, {y:0, duration: 0.1, ease: 'power1.inOut'});
}

export const indecatorOpening = (element, position) => {
    const tl = gsap.timeline();
    tl.to(element, {duration:0, opacity:1, ease: 'power1.out'})
      .to(element, {x: 50*position, duration:0.2, ease: 'power1.out'})
      .to(element, {x: 40*position, duration: 0.1, ease: 'power1.inOut'})
      .to(element, {x: 50*position, duration: 0.2, ease: 'power1.inOut'},"+=0.7")
      .to(element, {x: 0*position, duration: 0.1, opacity:0, ease: 'power1.in'})
}