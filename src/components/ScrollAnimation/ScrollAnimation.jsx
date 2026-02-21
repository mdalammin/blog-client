import React, { useLayoutEffect, useRef } from "react";
import "./style.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimation() {
  const container = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      const cards = gsap.utils.toArray(".card");
      const totalCards = cards.length;

      if (totalCards === 0) return;

      const cardYOffset = 12;
      const cardScaleStep = 0.09;

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
        end: `+=${window.innerHeight * 3}px`,
        pin: true,
        pinSpacing: true,
        // scrub: 0.6,
        // scrub: false,
        // snap: {
        //   snapTo: 1 / (totalCards - 1),
        //   delay: 0.1,
        //   duration: 0.6,
        //   ease: "power2.inOut",
        // },

        // snap: {
        //   snapTo: 1 / (totalCards - 1),
        //   duration: { min: 0.2, max: 0.5 },
        //   ease: "power3.out",
        //   inertia: false,
        // },

        scrub: 0.3,
        snap: {
          snapTo: (value) =>
            Math.round(value * (totalCards - 1)) / (totalCards - 1),
          duration: 0.25,
          ease: "power3.out",
        },

        onUpdate: (self) => {
          const progress = self.progress;
          const totalShift = progress * (totalCards - 1);

          cards.forEach((card, i) => {
            const currentProgressIndex =
              (i - totalShift + totalCards * 10) % totalCards;

            const slotA = Math.floor(currentProgressIndex);
            const slotB = (slotA + 1) % totalCards;
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
        <div className="card" id="card-1">
          <div className="col">
            <p>Quite Control</p>
            <h1>Signal Drift</h1>
          </div>
          <div className="col">
            <img src="/image1.png" alt="" />
          </div>
        </div>

        <div className="card" id="card-2">
          <div className="col">
            <p>Quite Control</p>
            <h1>Signal Drift</h1>
          </div>
          <div className="col">
            <img src="/image2.png" alt="" />
          </div>
        </div>

        <div className="card" id="card-3">
          <div className="col">
            <p>Original Master</p>
            <h1>Skyline Way</h1>
          </div>
          <div className="col">
            <img src="/image3.png" alt="" />
          </div>
        </div>

        <div className="card" id="card-4">
          <div className="col">
            <p>Wired Thought</p>
            <h1>Neural Assembly</h1>
          </div>
          <div className="col">
            <img src="/image4.png" alt="" />
          </div>
        </div>

        <div className="card" id="card-5">
          <div className="col">
            <p>Wired Thought</p>
            <h1>Neural Assembly</h1>
          </div>
          <div className="col">
            <img src="/image4.png" alt="" />
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Enter The Frame</h1>
      </section>
    </div>
  );
}
