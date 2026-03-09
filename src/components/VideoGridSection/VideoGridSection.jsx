"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export default function VideoGridSection() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const videoWrapRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    // Play / Pause toggle
    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) { v.play(); setPlaying(true); }
        else { v.pause(); setPlaying(false); }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=180%",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // ── 1. Video: scale down from "almost fullscreen" → natural grid size ──
            // scale(2) makes the center cell (~44 % of viewport) fill ~88% of screen
            tl.fromTo(
                videoWrapRef.current,
                { scale: 2.5, borderRadius: "20px" },
                { scale: 1, borderRadius: "20px", ease: "none", duration: 1 },
                0
            );

            // ── 2. Text overlay: fade out as video shrinks ──
            tl.to(".vg-overlay-text", {
                opacity: 0,
                ease: "none",
                duration: 0.4,
            }, 0);

            // ── 3. Play/pause button: fade out as video shrinks ──
            tl.to(".vg-play-btn", {
                opacity: 0,
                ease: "none",
                duration: 0.4,
            }, 0);

            // ── 4. Surrounding images slide in from their edges ──
            // Top row (row 1) — slide from above viewport
            tl.fromTo(".vg-slide-top",
                { yPercent: -110, opacity: 1 },
                { yPercent: 0, ease: "none", duration: 1 },
                0
            );
            // Bottom row (row 3) — slide from below viewport
            tl.fromTo(".vg-slide-bottom",
                { yPercent: 110, opacity: 1 },
                { yPercent: 0, ease: "none", duration: 1 },
                0
            );
            // Left column (row 2, col 1) — slide from left
            tl.fromTo(".vg-slide-left",
                { xPercent: -130, opacity: 1 },
                { xPercent: 0, ease: "none", duration: 1 },
                0
            );
            // Right column (row 2, col 3) — slide from right
            tl.fromTo(".vg-slide-right",
                { xPercent: 130, opacity: 1 },
                { xPercent: 0, ease: "none", duration: 1 },
                0
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="vg-section">
            <div className="vg-grid">

                {/* ── Row 1: 3 Cinematic Images ── */}
                <img
                    className="vg-grid-img vg-slide-top"
                    style={{ gridArea: "1 / 1 / 2 / 2" }}
                    src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600&q=80"
                    alt="Cinematic Stage"
                />
                <img
                    className="vg-grid-img vg-slide-top"
                    style={{ gridArea: "1 / 2 / 2 / 3" }}
                    src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80"
                    alt="Recording Studio"
                />
                <img
                    className="vg-grid-img vg-slide-top"
                    style={{ gridArea: "1 / 3 / 2 / 4" }}
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80"
                    alt="Mixing Console"
                />

                {/* ── Row 2: portrait left | center video | portrait right ── */}
                <img
                    className="vg-grid-img vg-slide-left"
                    style={{ gridArea: "2 / 1 / 3 / 2" }}
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80"
                    alt=""
                />

                {/* CENTER VIDEO CELL */}
                <div className="vg-video-wrap" ref={videoWrapRef} style={{ gridArea: "2 / 2 / 3 / 3" }}>
                    <video
                        ref={videoRef}
                        src="https://cdn.jsdelivr.net/gh/mdalammin/viserx-home-page-assets/videos/hero/showReel2026.webm"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />

                    {/* Text overlay — fades out as video shrinks */}
                    {/* <div className="vg-overlay-text">
                        <p>we cover all sustainable</p>
                        <p>solutions worldwide</p>
                    </div> */}

                    {/* Play / Pause button — fades out as video shrinks */}
                    <button className="vg-play-btn" onClick={togglePlay} aria-label="Toggle play">
                        {playing ? (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <rect x="5" y="3" width="4" height="18" rx="1" />
                                <rect x="15" y="3" width="4" height="18" rx="1" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5,3 19,12 5,21" />
                            </svg>
                        )}
                    </button>
                </div>

                <img
                    className="vg-grid-img vg-slide-right"
                    style={{ gridArea: "2 / 3 / 3 / 4" }}
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80"
                    alt=""
                />

                {/* ── Row 3: portrait left (col 1), center col 2, portrait right (col 3) ── */}
                <img
                    className="vg-grid-img vg-slide-bottom"
                    style={{ gridArea: "3 / 1 / 4 / 2" }}
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
                    alt=""
                />
                <img
                    className="vg-grid-img vg-slide-bottom"
                    style={{ gridArea: "3 / 2 / 4 / 3" }}
                    src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80"
                    alt=""
                />
                <img
                    className="vg-grid-img vg-slide-bottom"
                    style={{ gridArea: "3 / 3 / 4 / 4" }}
                    src="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&q=80"
                    alt=""
                />

            </div>
        </section>
    );
}