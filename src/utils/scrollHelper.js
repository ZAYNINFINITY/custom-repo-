import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const smoothScrollTo = (target, offset = 80) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: target, offsetY: offset },
    ease: "power2.inOut",
  });
};

export const scrollToSection = (sectionId, offset = 80) => {
  const target = `#${sectionId}`;
  smoothScrollTo(target, offset);
};

export const initSmoothScrolling = () => {
  // Smooth scrolling for navigation links
  gsap.utils.toArray('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.getAttribute("href");
      smoothScrollTo(target);
    });
  });
};
