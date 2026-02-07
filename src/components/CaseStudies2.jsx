import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CaseStudies2 = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current;

            // Initial state for all cards - Pronounced stacked effect
            const stackOffset = 10; // yPercent per card
            const scaleOffset = 0.05; // scale decrease per card

            gsap.set(cards, {
                yPercent: (i) => i * stackOffset,
                scale: (i) => 1 - (i * scaleOffset),
                opacity: 1,
                zIndex: (i) => cards.length - i
            });

            // Create a linear timeline
            const tl = gsap.timeline();

            // Animate cards away and move the rest forward
            cards.forEach((card, index) => {
                if (index < cards.length - 1) {
                    // const startTime = index * 1.5;
                    const startTime = index * 1;

                    // 1. Move the current top card out
                    tl.to(card, {
                        yPercent: -120,
                        // yPercent: -20,
                        opacity: 0,
                        // opacity: 0.8,
                        scale: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    }, startTime);

                    // 2. Simultaneously "step up" all remaining cards
                    cards.slice(index + 1).forEach((remainingCard, i) => {
                        const newStackPos = i; // Its new position relative to the current front
                        tl.to(remainingCard, {
                            yPercent: newStackPos * stackOffset,
                            scale: 1 - (newStackPos * scaleOffset),
                            duration: 1,
                            ease: "power2.inOut"
                        }, startTime);
                    });
                }
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                // end: `+=${cards.length * 800}`, // Increased scroll length for better feel
                end: `+=${cards.length * 500}`, // Increased scroll length for better feel
                pin: true,
                scrub: 1,
                animation: tl,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    /* ---------------- JSX ---------------- */
    return (
        <section ref={containerRef} className="gallery h-screen overflow-hidden bg-white">
            <ul className="cards relative h-full flex items-center justify-center">
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <li
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="card absolute w-[1020px] h-[420px] rounded-xl shadow-xl"
                        style={{
                            background: `url(https://picsum.photos/800/600?random=${index + 1}) center / cover no-repeat`,
                        }}
                    />
                ))}
            </ul>
        </section>
    );
};

export default CaseStudies2;

