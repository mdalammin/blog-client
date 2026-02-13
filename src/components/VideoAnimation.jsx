import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoAnimation() {
  const scaleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        scaleRef.current,
        {
          scale: 0.4,
          // opacity: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scaleRef.current,
            start: "top 30%",
            end: "+=900", // scroll distance
            // end: "bottom 10%", // scroll distance
            scrub: true,
            pin: true, // keeps section fixed while scaling
            // markers: true, // remove in production
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative">
      <div
        ref={scaleRef}
        className="bg-black min-h-screen flex items-center justify-center text-6xl font-bold"
      >
        🎬
      </div>
    </section>
  );
}
