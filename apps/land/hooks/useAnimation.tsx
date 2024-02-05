import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * "useAnimation" is a custom hook that returns a ref to a container element that can be used to scope
 * the animation to that element
 * @param {Props}  - `elementId` - The id of the element you want to animate.
 * @returns A ref object
 */
const useAnimation = (elementId: string) => {
  const container = useRef() as any;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(elementId, {
        y: -20,
        duration: 1,
        ease: "sine",
        scrollTrigger: {
          trigger: elementId,
          start: "-200",
          end: "top 20%",
          scrub: false,

          toggleActions: "restart none none none",
          markers: false, // enable to debug position of scroll trigger
          onLeaveBack: () =>
            gsap.to(elementId, { y: 0, duration: 1, ease: "sine" }),
        },
      });
    }, container); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);

  return { container };
};
export default useAnimation;
