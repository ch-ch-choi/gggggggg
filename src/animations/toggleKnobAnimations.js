import { gsap } from "gsap";

export const btnsOn = (element) => {
    gsap.to(element, {y: 0, duration: 0.2})
};
export const btnsOff = (element,position) => {
    gsap.to(element, {y: -140*position, duration: 0.2})
};

export const knobOn = (element) => {
    gsap.to(element, {
        duration: 0.2,
        rotation: 180,
        ease: "power1.out",
        scale: 1.1,
    })
};
export const knobOff = (element) => {
    gsap.to(element, {
        duration: 0.2,
        rotation: 0,
        ease: "power1.out",
        scale: 1,
    })
};

export const btnsStandby = (element,position) => {
    gsap.to(element, {
        y: -140*position
    })
}

export const btnsOpening = (element,position) => {
    const tl = gsap.timeline();

    tl.to(element, {
        y: -140*position, duration: 0
    })
    .to(element, {
        y: 0, duration: 0.3
    })
    .to(element, {
        y: -140*position, duration: 0.5
    }, "+=1.2");
}

export const knobOpening = (element) => {
    const tl = gsap.timeline(); // 타임라인 생성

    tl.to(element, {
        duration: 0.3,
        rotation: 180,
        scale:0.9,
        ease: "power1.out"
    })
    .to(element, {
        duration: 0.5,
        rotation: 0,
        scale: 1,
        ease: "power1.out"
    }, "+=1.2");
};

export const knobDisabled = (element) => {
    const tl = gsap.timeline();

    tl.to(element, {
        duration: 0.07,
        rotation: 40,
        ease: "power2.out"
    })
    .to(element, {
        duration: 0.07,
        rotation: -20,
        ease: "power2.inOut"
    })
    .to(element, {
        duration: 0.07,
        rotation: 10,
        ease: "power2.inOut"
    })
    .to(element, {
        duration: 0.07,
        rotation: 0,
        ease: "power2.inOut"
    })
} 