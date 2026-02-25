import React, { useLayoutEffect, useRef } from "react";
import "./style.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const container = useRef(null);
  const isMobile = window.innerWidth < 768;

  // Lenis removed because it frequently conflicts with GSAP pinning and snaps
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".card");
      const totalCards = cards.length;

      if (totalCards === 0) return;

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
        // Card 0 starts at center (slot 2)
        const slotIndex = (i + 2) % slots.length;

        // Force very first initial frame instantly
        gsap.set(card, {
          xPercent: -50,
          yPercent: slots[slotIndex].y,
          scale: slots[slotIndex].s,
          autoAlpha: 1,
          zIndex: Math.round(slots[slotIndex].s * 200) + (totalCards - i),
        });
      });

      let activeIndex = -1; // init marker

      ScrollTrigger.create({
        trigger: ".sticky-cards",
        start: "top top",
        end: `+=${window.innerHeight * (totalCards - 1) * 0.5}`,
        pin: true,
        pinSpacing: true,
        scrub: false, // Turn off scrub! We only want discrete changes
        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          // Calculate integer index based on scroll progress
          const newIndex = Math.round(self.progress * (totalCards - 1));

          if (newIndex !== activeIndex) {
            activeIndex = newIndex;

            cards.forEach((card, i) => {
              // Map to the requested slot logic
              const slotIndex = (i - activeIndex + 2 + totalCards * 10) % slots.length;

              gsap.to(card, {
                yPercent: slots[slotIndex].y,
                scale: slots[slotIndex].s,
                autoAlpha: 1,
                duration: 0.8, // Smooth transition duration when changing
                ease: "power3.out", // Decelerating ease
                zIndex: Math.round(slots[slotIndex].s * 200) + (totalCards - i),
                overwrite: "auto",
              });
            });
          }
        },
      });

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
