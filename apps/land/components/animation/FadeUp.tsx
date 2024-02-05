"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/animation.css";
interface Props {
  children: React.ReactNode;
}

const FadeUp = ({ children }: Props) => {
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

  return (
    <div
      className={`fadeUp relative z-[1] ${
        isVisible ? "fadeUpVisible" : "fadeUpInvisible"
      }`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeUp;
