import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TextScrolling() {
  const parentRef = useRef(null);
  const childText = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        childText.current,
        { x: "0%" },
        {
          x: "-67%",
          //   transform: "translateX(-350%)",
          //   ease: "none",
          scrollTrigger: {
            trigger: parentRef.current,
            // start: "top top",
            start: "top 0%",
            end: "top -150%",
            // end: "+=1000",
            pin: true, // keeps section fixed while scaling
            // pin: true, // jodi pin true na dei tahole section sticky/fixed hobe na scroll er sathe sathe nicher dike ashte thakbe and oi section er animation hoite thakbe
            scrub: 2,
            markers: true, // remove in production
          },
        },
      );
    }, parentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={parentRef}
      className="min-h-screen bg-black overflow-hidden flex items-center"
    >
      <h1
        ref={childText}
        className="text-[200px] md:text-[400px] lg:text-[600px] font-semibold text-white whitespace-nowrap"
      >
        Empowering-VISERX
      </h1>
    </section>
  );
}
