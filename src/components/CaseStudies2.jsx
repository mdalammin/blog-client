import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CaseStudies = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    const iteration = useRef(0);
    const scrub = useRef(null);
    const seamlessLoop = useRef(null);
    const trigger = useRef(null);

    const spacing = 0.15;
    const snap = gsap.utils.snap(spacing);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current;

            seamlessLoop.current = buildSeamlessLoop(cards, spacing);

            scrub.current = gsap.to(seamlessLoop.current, {
                totalTime: 0,
                duration: 0.5,
                ease: "power3",
                paused: true,
            });

            trigger.current = ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000",
                pin: true,
                scrub: false,
                onUpdate(self) {
                    if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
                        wrapForward(self);
                    } else if (self.progress < 0.00001 && self.direction < 0 && !self.wrapping) {
                        wrapBackward(self);
                    } else {
                        scrub.current.vars.totalTime = snap(
                            (iteration.current + self.progress) *
                            seamlessLoop.current.duration()
                        );
                        scrub.current.invalidate().restart();
                        self.wrapping = false;
                    }
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    /* ---------------- LOOP CONTROL ---------------- */
    const wrapForward = (triggerInstance) => {
        iteration.current++;
        triggerInstance.wrapping = true;
        triggerInstance.scroll(triggerInstance.start + 1);
    };

    const wrapBackward = (triggerInstance) => {
        iteration.current--;
        if (iteration.current < 0) {
            iteration.current = 9;
            seamlessLoop.current.totalTime(
                seamlessLoop.current.totalTime() +
                seamlessLoop.current.duration() * 10
            );
            scrub.current.pause();
        }
        triggerInstance.wrapping = true;
        triggerInstance.scroll(triggerInstance.end - 1);
    };

    /* ---------------- JSX ---------------- */
    return (
        <section ref={containerRef} className="gallery h-screen overflow-hidden bg-white">
            <ul className="cards relative h-full flex items-center justify-center">
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <li
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="card absolute w-[720px] h-[420px] rounded-xl shadow-xl"
                        style={{
                            background: `url(https://picsum.photos/800/600?random=${index + 1}) center / cover no-repeat`,
                        }}
                    />
                ))}
            </ul>
        </section>
    );
};

export default CaseStudies;

/* ---------------- GSAP HELPERS ---------------- */

function buildSeamlessLoop(items, spacing) {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;

    const rawSequence = gsap.timeline({ paused: true });
    const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
            this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
    });

    gsap.set(items, {
        yPercent: 300,
        opacity: 0,
        scale: 0,
    });

    const total = items.length + overlap * 2;

    for (let i = 0; i < total; i++) {
        const index = i % items.length;
        const item = items[index];
        const time = i * spacing;

        rawSequence
            .fromTo(
                item,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.in",
                    immediateRender: false,
                },
                time
            )
            .fromTo(
                item,
                { yPercent: 300 },
                {
                    yPercent: -300,
                    duration: 1,
                    ease: "none",
                    immediateRender: false,
                },
                time
            );
    }

    rawSequence.time(startTime);

    seamlessLoop
        .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none",
        })
        .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none",
            }
        );

    return seamlessLoop;
}
