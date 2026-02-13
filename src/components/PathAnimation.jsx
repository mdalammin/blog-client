import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function PathAnimation() {
  const stringRef = useRef(null);
  const pathRef = useRef(null);

  let initialPath = `M 10 200 Q 500 200 990 200`;
  let finalPath = `M 10 200 Q 500 200 990 200`;

  useLayoutEffect(() => {
    const string = stringRef.current;

    const handleMouseMove = (e) => {
      const rect = string.getBoundingClientRect();

      console.log("mousemove", e);
      console.log("rect", rect);

      // Convert mouse position to SVG local position
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(pathRef.current, {
        duration: 0.3,
        attr: { d: `M 10 200 Q ${x} ${y} 990 200` },
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(pathRef.current, {
        duration: 1.5,
        attr: { d: finalPath },
        ease: "elastic.out(1,0.2)",
      });
    };

    string.addEventListener("mousemove", handleMouseMove);
    string.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      string.removeEventListener("mousemove", handleMouseMove);
      string.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="bg-teal-800">
      <div className="">
        <svg
          width="1000"
          height="400"
          className="max-w-7xl mx-auto"
          ref={stringRef}
        >
          <path
            ref={pathRef}
            d={initialPath}
            stroke="white"
            fill="transparent"
          />
        </svg>
      </div>
    </div>
  );
}
