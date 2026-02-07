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

            /* -------------------------------
               UPDATE CARDS (UNCHANGED DESIGN)
            -------------------------------- */
            const updateCards = (focusIdx) => {
                cards.forEach((card, i) => {
                    const relativeIdx = i - focusIdx;
                    const isFocused = relativeIdx === 0;

                    gsap.to(card, {
                        y: relativeIdx * 80,
                        scale: 1 - Math.abs(relativeIdx) * 0.05,
                        zIndex: 100 - Math.abs(relativeIdx),
                        duration: 0.6,
                        ease: "power3.out",
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

            /* -------------------------------
               INITIAL STATE
            -------------------------------- */
            updateCards(currentFocusRef.current);

            /* -------------------------------
               STICKY PIN (REAL STICKY)
            -------------------------------- */
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=80%",
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
                onEnter: () => (isPinnedRef.current = true),
                onEnterBack: () => (isPinnedRef.current = true),
                onLeave: () => (isPinnedRef.current = false),
                onLeaveBack: () => (isPinnedRef.current = false),
            });

            /* -------------------------------
               WHEEL CONTROL (LOCK + RELEASE)
            -------------------------------- */
            const onWheel = (e) => {
                if (!isPinnedRef.current) return;
                if (isAnimatingRef.current) {
                    e.preventDefault();
                    return;
                }

                const direction = e.deltaY > 0 ? 1 : -1;
                const current = currentFocusRef.current;
                const next = current + direction;

                // 🚪 RELEASE scroll at edges
                if (
                    (current === 0 && direction === -1) ||
                    (current === totalCards - 1 && direction === 1)
                ) {
                    return;
                }

                e.preventDefault();

                const clamped = Math.max(0, Math.min(next, totalCards - 1));
                if (clamped === current) return;

                isAnimatingRef.current = true;
                currentFocusRef.current = clamped;

                updateCards(clamped);

                gsap.delayedCall(0.7, () => {
                    isAnimatingRef.current = false;
                });
            };

            containerRef.current.addEventListener("wheel", onWheel, {
                passive: false, // 🔥 REQUIRED
            });

            return () => {
                containerRef.current?.removeEventListener("wheel", onWheel);
            };
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
}
