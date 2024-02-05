"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/animation.css";
interface Props {
  children: React.ReactNode;
}

const Fade = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  /** TRIGGER ONCE */
  // useEffect(() => {
  //   const observer = new IntersectionObserver(([entry]) => {
  //     setIsVisible(entry.isIntersecting);
  //   }, { threshold: 0.1 });

  //   if (domRef.current) {
  //     observer.observe(domRef.current);
  //   }

  //   return () => {
  //     if (domRef.current) {
  //       observer.unobserve(domRef.current);
  //     }
  //   };
  // }, []);

  return (
    <div
      className={`fade relative z-[1] ${
        isVisible ? "fadeVisible" : "fadeInvisible"
      }`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default Fade;
