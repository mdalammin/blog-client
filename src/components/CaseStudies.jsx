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

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardRefs.current;
            const totalCards = cards.length;
            const initialFocusIdx = 2; // Card 3 starts centered

            // Initial State: Card 3 is focused
            cards.forEach((card, i) => {
                const relativeIdx = i - initialFocusIdx;
                const isFocused = relativeIdx === 0;

                gsap.set(card, {
                    y: relativeIdx * 80,
                    scale: 1 - Math.abs(relativeIdx) * 0.05,
                    zIndex: 100 - Math.abs(relativeIdx),
                });

                // Aggressive internal visibility control
                gsap.set(card.querySelector(".card-main-content"), { autoAlpha: isFocused ? 1 : 0 });
                gsap.set(card.querySelector(".card-button"), { autoAlpha: isFocused ? 1 : 0 });
                gsap.set(card.querySelector(".card-image"), { autoAlpha: isFocused ? 1 : 0.3 });

                // Tabs: Category at top, Metrics at bottom
                gsap.set(card.querySelector(".card-title"), { autoAlpha: relativeIdx <= 0 ? 1 : 0 });
                gsap.set(card.querySelector(".card-metrics"), { autoAlpha: relativeIdx >= 0 ? 1 : 0 });
            });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=120%", // More compact for faster scroll
                    pin: true,
                    scrub: true, // Instant feedback
                    invalidateOnRefresh: true,
                },
            });

            const remainingSteps = totalCards - initialFocusIdx - 1;

            if (remainingSteps > 0) {
                for (let i = 1; i <= remainingSteps; i++) {
                    const currentFocusIdx = initialFocusIdx + i;
                    const stepDuration = 1 / remainingSteps;

                    timeline.to({}, { duration: stepDuration });

                    cards.forEach((card, targetIdx) => {
                        const relativeIdx = targetIdx - currentFocusIdx;
                        const isFocused = relativeIdx === 0;

                        timeline.to(card, {
                            y: relativeIdx * 80,
                            scale: 1 - Math.abs(relativeIdx) * 0.05,
                            zIndex: 100 - Math.abs(relativeIdx),
                            duration: stepDuration,
                            ease: "power2.inOut",
                        }, "<");

                        // Toggle visibility mid-transition
                        timeline.to(card.querySelector(".card-main-content"), {
                            autoAlpha: isFocused ? 1 : 0,
                            duration: stepDuration * 0.5,
                        }, "<");
                        timeline.to(card.querySelector(".card-button"), {
                            autoAlpha: isFocused ? 1 : 0,
                            duration: stepDuration * 0.5,
                        }, "<");
                        timeline.to(card.querySelector(".card-image"), {
                            autoAlpha: isFocused ? 1 : 0.3,
                            duration: stepDuration * 0.5,
                        }, "<");

                        timeline.to(card.querySelector(".card-title"), {
                            autoAlpha: relativeIdx <= 0 ? 1 : 0,
                            duration: stepDuration * 0.5,
                        }, "<");
                        timeline.to(card.querySelector(".card-metrics"), {
                            autoAlpha: relativeIdx >= 0 ? 1 : 0,
                            duration: stepDuration * 0.5,
                        }, "<");
                    });
                }
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen bg-white">
            <div className="h-screen flex items-center justify-center overflow-hidden px-4">
                <div className="relative w-full max-w-7xl mx-auto h-[480px]">
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
};
