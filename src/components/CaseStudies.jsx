import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StackCard from "./StackCard";

gsap.registerPlugin(ScrollTrigger);

const caseStudiesData = [
  { title: "Technology", color: "#aec7ffff", id: 1 },
  { title: "Finance", color: "#8db0fcff", id: 2 },
  { title: "Service", color: "#234db1ff", id: 3 },
  { title: "Home Decorate", color: "#8db0fcff", id: 4 },
  { title: "E-commerce", color: "#aec7ffff", id: 5 },
];

export default function CaseStudies() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const currentFocusRef = useRef(2);
  const isAnimatingRef = useRef(false);
  const isPinnedRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const totalCards = cards.length;
      const isMobile = window.innerWidth < 768;

      const updateCards = (focusIdx) => {
        cards.forEach((card, i) => {
          const relativeIdx = i - focusIdx;
          const isFocused = relativeIdx === 0;
          const gap = isMobile ? 30 : 80;

          gsap.to(card, {
            y: relativeIdx * gap,
            scale: 1 - Math.abs(relativeIdx) * 0.05,
            zIndex: 100 - Math.abs(relativeIdx),
            duration: 0.6,
            ease: "power1.out",
          });

          gsap.to(card.querySelector(".card-main-content"), {
            autoAlpha: isFocused ? 1 : 0,
            duration: 0.3,
          });

          gsap.to(card.querySelector(".card-button"), {
            autoAlpha: isFocused ? 1 : 0,
            duration: 0.3,
          });

          gsap.to(card.querySelector(".card-image"), {
            autoAlpha: isFocused ? 1 : 0.3,
            duration: 0.3,
          });

          gsap.to(card.querySelector(".card-title"), {
            autoAlpha: relativeIdx <= 0 ? 1 : 0,
            duration: 0.3,
          });

          gsap.to(card.querySelector(".card-metrics"), {
            autoAlpha: relativeIdx >= 0 ? 1 : 0,
            duration: 0.3,
          });
        });
      };

      updateCards(currentFocusRef.current);

      // ✅ DESKTOP (Wheel)
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=80%",
          pin: true,
        });

        const onWheel = (e) => {
          if (isAnimatingRef.current) {
            e.preventDefault();
            return;
          }

          const direction = e.deltaY > 0 ? 1 : -1;
          const current = currentFocusRef.current;
          const next = Math.max(
            0,
            Math.min(current + direction, totalCards - 1),
          );

          if (next === current) return;

          e.preventDefault();

          isAnimatingRef.current = true;
          currentFocusRef.current = next;
          updateCards(next);

          gsap.delayedCall(0.6, () => {
            isAnimatingRef.current = false;
          });
        };

        containerRef.current.addEventListener("wheel", onWheel, {
          passive: false,
        });

        return () => {
          containerRef.current?.removeEventListener("wheel", onWheel);
        };
      }

      // ✅ MOBILE (ScrollTrigger Driven)
      else {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalCards * 50}%`,
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.round(progress * (totalCards - 1));

            if (newIndex !== currentFocusRef.current) {
              currentFocusRef.current = newIndex;
              updateCards(newIndex);
            }
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-white">
      <div className="h-screen flex items-center justify-center overflow-hidden px-4 py-16">
        <div className="relative w-full max-w-7xl mx-auto h-full md:h-[480px]">
          {caseStudiesData.map((study, index) => (
            <StackCard
              key={study.id}
              ref={(el) => (cardRefs.current[index] = el)}
              title={study.title}
              style={{ backgroundColor: study.color }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
