import gsap from "gsap";

export const headLoading = (element) => {
    gsap.to(element, {opacity: 0, duration: 0.5}, "+=1");
}

export const logoLoading = (element) => {
    const tl = gsap.timeline();

    tl.to(element,{y: 6, duration: 0.2, ease: "power3.out"})
    .to(element,{y: -3, duration: 0.1, ease: "power1.inOut"})
    .to(element,{y: 0, duration: 0.1, ease: "power1.inOut"})
};

export const logoLoadingStandby = (element) => {
    gsap.to(element, {y: -500})
};

export const bracketLoadingStandby = (element, position) => {
    gsap.to(element, {x: 500*position, opacity: 0});
};
export const bracketLoading = (element, position) => {
    const tl = gsap.timeline();
    tl.to(element, {x: -10*position, opacity:1, duration:0.2, ease: "power2.out"});
    tl.to(element, {x: 0, duration:0.08, ease: "power2.inOut"});
};

export const knobLoading = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {x: -10, duration:0.2, ease: "power2.out"});
    tl.to(element, {x: 0, duration:0.08, ease: "power2.inOut"});
};
export const knobLoadingStandby = (element) => {
    gsap.to(element, {x: 200});
};

export const titleLoading = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {x: 10, duration:0.2, ease: "power2.out"});
    tl.to(element, {x: 0, duration:0.08, ease: "power2.inOut"});
};
export const titleLoadingStandby = (element) => {
    gsap.to(element, {x: -200})
};

export const bookListLoading = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {x: 10, opacity: 1, duration:0.16, ease: "power2.out"});
    tl.to(element, {x: 0, duration:0.08, ease: "power2.inOut"});
};
export const bookListLoadingStandby = (element) => {
    gsap.to(element, {x: -100, opacity: 0});
};

export const bookCoverLoading = (element) => {
    const tl = gsap.timeline();
    tl.to(element, {x: -10, opacity: 1, duration:0.08, ease: "power2.out"});
    tl.to(element, {x: 0, duration:0.08, ease: "power2.inOut"});
};
export const bookCoverLoadingStandby = (element) => {
    gsap.to(element, {x: 50, opacity: 0});
};
