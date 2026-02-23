import React, { useLayoutEffect, useRef } from "react";
import "./style.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const container = useRef(null);
  const isMobile = window.innerWidth < 768;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // const lenis = new Lenis();
      const lenis = new Lenis({
        lerp: isMobile ? 0.05 : 0.08, // mobile slower
        wheelMultiplier: isMobile ? 0.7 : 1, // scroll slow
        touchMultiplier: isMobile ? 0.6 : 1, // touch slow
      });
      lenis.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      const cards = gsap.utils.toArray(".card");
      const totalCards = cards.length;

      if (totalCards === 0) return;

      // const cardYOffset = 12;
      // const cardScaleStep = 0.09;

      // for React
      // ✅ Responsive values
      let cardYOffset;
      let cardScaleStep;

      const width = window.innerWidth;

      if (width < 480) {
        // 📱 Mobile
        cardYOffset = 8;
        cardScaleStep = 0.06;
      } else if (width < 768) {
        // 📱 Tablet
        cardYOffset = 10;
        cardScaleStep = 0.07;
      } else if (width < 1024) {
        // 💻 Small laptop
        cardYOffset = 11;
        cardScaleStep = 0.08;
      } else {
        // 🖥️ Desktop
        cardYOffset = 12;
        cardScaleStep = 0.09;
      }

      // For Next
      // ✅ responsive
      // const width = window.innerWidth;
      // const cardYOffset = gsap.utils.clamp(8, width * 0.008, 14);
      // const cardScaleStep = gsap.utils.clamp(0.05, width * 0.00008, 0.1);

      // Define the 5 fixed vertical positions (Slots)
      const slots = [
        { y: -50 - 2 * cardYOffset, s: 1 - 2 * cardScaleStep }, // Slot 0
        { y: -50 - 1 * cardYOffset, s: 1 - 1 * cardScaleStep }, // Slot 1
        { y: -50, s: 1 }, // Slot 2 (CENTER)
        { y: -50 + 1 * cardYOffset, s: 1 - 1 * cardScaleStep }, // Slot 3
        { y: -50 + 2 * cardYOffset, s: 1 - 2 * cardScaleStep }, // Slot 4
      ];

      // Initial setup
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: slots[i % slots.length].y,
          scale: slots[i % slots.length].s,
          autoAlpha: 1,
        });
      });

      ScrollTrigger.create({
        trigger: ".sticky-cards",
        start: "top top",
        // end: `+=${window.innerHeight * 3}px`,
        end: `+=${window.innerHeight * (isMobile ? 6 : 3)}`,
        pin: true,
        pinSpacing: true,
        scrub: isMobile ? 0.15 : 0.3,
        snap: {
          snapTo: (value) =>
            Math.round(value * (totalCards - 1)) / (totalCards - 1),
          duration: isMobile ? 0.4 : 0.25,
          ease: "power3.out",
        },

        onUpdate: (self) => {
          const progress = self.progress;
          const totalShift = progress * (totalCards - 1);

          cards.forEach((card, i) => {
            const currentProgressIndex =
              (i - totalShift + totalCards * 10) % totalCards;

            const slotA = Math.floor(currentProgressIndex);
            // const slotB = (slotA + 1) % totalCards;
            const slotB = (slotA + 1) % slots.length;
            const segmentProgress = currentProgressIndex - slotA;

            const targetY = gsap.utils.interpolate(
              slots[slotA % slots.length].y,
              slots[slotB % slots.length].y,
              segmentProgress,
            );
            const targetS = gsap.utils.interpolate(
              slots[slotA % slots.length].s,
              slots[slotB % slots.length].s,
              segmentProgress,
            );

            gsap.set(card, {
              yPercent: targetY,
              scale: targetS,
              autoAlpha: 1,
              zIndex: Math.round(targetS * 200) + (totalCards - i),
            });
          });
        },
      });

      return () => {
        lenis.destroy();
        gsap.ticker.remove(tickerCallback);
      };
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container}>
      <section className="intro">
        <h1>Enter The Frame</h1>
      </section>

      <section className="sticky-cards">
        <div className="card bg-[#739bf2]" id="card-1">
          <div className="col">
            <h1 className="font-semibold">Technology</h1>
            <p className="text-[34px]">
              Apple Gadgets Doubles Traffic with Strategic SEO in 3 Months
            </p>

            <div className="flex justify gap-12">
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
            </div>

            <div>
              <button className="px-4 py-3 cursor-pointer rounded-full bg-black text-white">
                View Details
              </button>
            </div>

            <h1>Current Impression</h1>
          </div>

          <div className="col">
            <img src="/img1.png" alt="" />
          </div>
        </div>

        <div className="card bg-[#a2bcf6]" id="card-2">
          <div className="col">
            <h1 className="font-semibold">Technology</h1>
            <p className="text-[34px]">
              Apple Gadgets Doubles Traffic with Strategic SEO in 3 Months
            </p>

            <div className="flex justify gap-12">
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
            </div>

            <div>
              <button className="px-4 py-3 cursor-pointer rounded-full bg-black text-white">
                View Details
              </button>
            </div>

            <h1>Current Impression</h1>
          </div>
          <div className="col py-[30px]">
            <img src="/img1.png" alt="" />
          </div>
        </div>

        <div className="card bg-[#d0defb]" id="card-3">
          <div className="col">
            <h1 className="font-semibold">Technology</h1>
            <p className="text-[34px]">
              Apple Gadgets Doubles Traffic with Strategic SEO in 3 Months
            </p>

            <div className="flex justify gap-12">
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
            </div>

            <div>
              <button className="px-4 py-3 cursor-pointer rounded-full bg-black text-white">
                View Details
              </button>
            </div>

            <h1>Current Impression</h1>
          </div>
          <div className="col">
            <img src="/img1.png" alt="" />
          </div>
        </div>

        <div className="card bg-[#a2bcf6]" id="card-4">
          <div className="col">
            <h1 className="font-semibold">Technology</h1>
            <p className="text-[34px]">
              Apple Gadgets Doubles Traffic with Strategic SEO in 3 Months
            </p>

            <div className="flex justify gap-12">
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
            </div>

            <div>
              <button className="px-4 py-3 cursor-pointer rounded-full bg-black text-white">
                View Details
              </button>
            </div>

            <h1>Current Impression</h1>
          </div>
          <div className="col">
            <img src="/img1.png" alt="" />
          </div>
        </div>

        <div className="card bg-[#d0defb]" id="card-5">
          <div className="col">
            <h1 className="font-semibold">Technology</h1>
            <p className="text-[34px]">
              Apple Gadgets Doubles Traffic with Strategic SEO in 3 Months
            </p>

            <div className="flex justify gap-12">
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
              <div>
                <h2 className="text-[45px]">45%</h2>
                <p className="text-[20px]">Good</p>
              </div>
            </div>

            <div>
              <button className="px-4 py-3 cursor-pointer rounded-full bg-black text-white">
                View Details
              </button>
            </div>

            <h1>Current Impression</h1>
          </div>
          <div className="col">
            <img src="/img1.png" alt="" />
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Enter The Frame</h1>
      </section>
    </div>
  );
}
