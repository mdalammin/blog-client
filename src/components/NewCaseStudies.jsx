import React, { useState, useEffect, useRef, useCallback } from "react";
import { Check, AlertCircle, Lightbulb, Code, Zap } from "lucide-react";

/* ─────────────────────────────────────────────
   CARD DATA
───────────────────────────────────────────── */
const CARDS = [
  {
    category: "Technology",
    title: "Code Structure & Organization",
    description: "How you organize components, files, and logic",
    metric1: { value: "85%", label: "Structure Score" },
    metric2: { value: "Good", label: "Organization" },
    details:
      "Your requirements are clear and well-structured. You specify tech stack upfront (React, Tailwind CSS).",
    color: "#0C7779",
    icon: Code,
  },
  {
    category: "Finance",
    title: "Specification Clarity",
    description: "How clearly you define requirements and constraints",
    metric1: { value: "90%", label: "Clarity Score" },
    metric2: { value: "Excellent", label: "Detail Level" },
    details:
      "Great detail: dimensions, responsive requirements, and animation behavior all specified.",
    color: "#005461",
    icon: Check,
  },
  {
    category: "UX Design",
    title: "UX & Interaction Design",
    description: "Your approach to user experience and interactions",
    metric1: { value: "95%", label: "UX Awareness" },
    metric2: { value: "Strong", label: "Interaction Focus" },
    details:
      "Excellent attention to scroll behavior, smooth transitions, and responsive design.",
    color: "#215E61",
    icon: Zap,
  },
  {
    category: "Communication",
    title: "Technical Communication",
    description: "How you communicate technical concepts",
    metric1: { value: "75%", label: "Communication" },
    metric2: { value: "Improving", label: "Documentation" },
    details:
      "Consider bullet points for complex specs to dramatically improve clarity.",
    color: "#088395",
    icon: AlertCircle,
  },
  {
    category: "Development",
    title: "Flexibility & Best Practices",
    description: "Your awareness of tools and modern practices",
    metric1: { value: "88%", label: "Best Practices" },
    metric2: { value: "Flexible", label: "Approach" },
    details:
      "You're open to libraries which shows pragmatism over reinventing the wheel.",
    color: "#09637E",
    icon: Lightbulb,
  },
];

/* ─────────────────────────────────────────────
   SINGLE CARD
───────────────────────────────────────────── */
const Card = ({ card, index, activeCard }) => {
  const Icon = card.icon;
  const diff = (() => {
    let d = index - activeCard;
    if (d > Math.floor(CARDS.length / 2)) d -= CARDS.length;
    if (d < -Math.floor(CARDS.length / 2)) d += CARDS.length;
    return d;
  })();
  const abs = Math.abs(diff);
  const isActive = diff === 0;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "calc(100% - 48px)",
    maxWidth: "860px",
    transform: `translate(-50%, calc(-50% + ${diff * 112}px)) scale(${isActive ? 1 : Math.max(0.78, 1 - abs * 0.1)})`,
    opacity: isActive ? 1 : Math.max(0.18, 1 - abs * 0.4),
    zIndex: 50 - abs * 10,
    filter: abs > 0 ? `blur(${abs * 1.5}px)` : "none",
    transition: "all 0.72s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: isActive ? "auto" : "none",
  };

  return (
    <div style={style}>
      <div
        style={{
          background: "linear-gradient(135deg, #111c24 0%, #0d1a22 100%)",
          border: isActive
            ? `1px solid ${card.color}`
            : "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: isActive
            ? `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${card.color}40`
            : "0 8px 32px rgba(0,0,0,0.3)",
          display: "flex",
          transition: "border-color 0.72s ease, box-shadow 0.72s ease",
        }}
      >
        {/* Left */}
        <div style={{ flex: 1, padding: "40px 36px" }}>
          <span
            style={{
              display: "inline-block",
              background: `${card.color}25`,
              color: "#08bcd4",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "20px",
            }}
          >
            {card.category}
          </span>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 10px",
              letterSpacing: "-0.01em",
            }}
          >
            {card.title}
          </h2>
          <p
            style={{
              color: "#5a7a8a",
              fontSize: "14px",
              margin: "0 0 28px",
              lineHeight: 1.6,
            }}
          >
            {card.description}
          </p>
          <div style={{ display: "flex", gap: "28px", marginBottom: "28px" }}>
            {[card.metric1, card.metric2].map((m, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: card.color,
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#5a7a8a",
                    marginTop: "4px",
                    fontWeight: 500,
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <button
            style={{
              background: `linear-gradient(135deg, ${card.color}, ${card.color}99)`,
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 22px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            View Details →
          </button>
          <div
            style={{
              marginTop: "24px",
              padding: "12px 14px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "10px",
              borderLeft: `3px solid ${card.color}`,
            }}
          >
            <p
              style={{
                color: "#7a9aaa",
                fontSize: "12px",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {card.details}
            </p>
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            width: "230px",
            flexShrink: 0,
            background: `linear-gradient(160deg, ${card.color}28 0%, ${card.color}06 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "36px 20px",
            gap: "18px",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: `${card.color}22`,
              border: `2px solid ${card.color}50`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={32} color={card.color} />
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <div
              style={{
                color: "#5a7a8a",
                fontSize: "11px",
                marginBottom: "8px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Overall Score
            </div>
            <div
              style={{
                height: "5px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: card.metric1.value,
                  background: `linear-gradient(90deg, ${card.color}, #08d4d4)`,
                  borderRadius: "999px",
                  transition: "width 1s ease",
                }}
              />
            </div>
            <div
              style={{
                color: card.color,
                fontSize: "20px",
                fontWeight: 800,
                marginTop: "10px",
              }}
            >
              {card.metric1.value}
            </div>
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.08)",
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PINNED CARD SECTION
───────────────────────────────────────────── */
const PinnedCardSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Exit animation states
  const [exitDir, setExitDir] = useState(null); // "down" | "up"
  const [flashOpacity, setFlashOpacity] = useState(0);

  const sectionRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const isLockedRef = useRef(false);
  const activeCardRef = useRef(0);

  // Keep refs in sync with state
  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);
  useEffect(() => {
    activeCardRef.current = activeCard;
  }, [activeCard]);

  /* ── Lock / Unlock helpers ── */
  const lockScroll = useCallback(() => {
    setIsLocked(true);
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback((direction) => {
    setExitDir(direction);
    setFlashOpacity(1);

    // Quick flash overlay then unlock
    setTimeout(() => setFlashOpacity(0), 120);
    setTimeout(() => {
      setIsLocked(false);
      setExitDir(null);
      document.body.style.overflow = "";
      isScrollingRef.current = false;
    }, 300);
  }, []);

  /* ── IntersectionObserver: lock when section reaches viewport center ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          lockScroll();
        }
      },
      { threshold: 0.6 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [lockScroll]);

  /* ── Wheel handler: intercept only when locked ── */
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isLockedRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      if (isScrollingRef.current) return;
      const delta = e.deltaY;
      if (Math.abs(delta) < 8) return;

      isScrollingRef.current = true;
      clearTimeout(scrollTimeoutRef.current);

      const cur = activeCardRef.current;

      if (delta > 0) {
        // Scrolling DOWN
        if (cur < CARDS.length - 1) {
          // Still have cards — advance
          setActiveCard(cur + 1);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 750);
        } else {
          // On last card — unlock downward
          unlockScroll("down");
          // Nudge page scroll forward slightly so next section comes into view
          setTimeout(
            () => window.scrollBy({ top: 80, behavior: "smooth" }),
            80,
          );
        }
      } else {
        // Scrolling UP
        if (cur > 0) {
          // Still have cards — go back
          setActiveCard(cur - 1);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 750);
        } else {
          // On first card — unlock upward
          unlockScroll("up");
          setTimeout(
            () => window.scrollBy({ top: -80, behavior: "smooth" }),
            80,
          );
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [unlockScroll]);

  /* ── Touch handler ── */
  useEffect(() => {
    let touchStartY = 0;

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (!isLockedRef.current || isScrollingRef.current) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;

      isScrollingRef.current = true;
      const cur = activeCardRef.current;

      if (delta > 0) {
        if (cur < CARDS.length - 1) {
          setActiveCard(cur + 1);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 750);
        } else {
          unlockScroll("down");
          setTimeout(
            () => window.scrollBy({ top: 80, behavior: "smooth" }),
            80,
          );
        }
      } else {
        if (cur > 0) {
          setActiveCard(cur - 1);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 750);
        } else {
          unlockScroll("up");
          setTimeout(
            () => window.scrollBy({ top: -80, behavior: "smooth" }),
            80,
          );
        }
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [unlockScroll]);

  /* ── Keyboard handler ── */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isLockedRef.current || isScrollingRef.current) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();

      isScrollingRef.current = true;
      const cur = activeCardRef.current;

      if (e.key === "ArrowDown") {
        if (cur < CARDS.length - 1) {
          setActiveCard(cur + 1);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 750);
        } else {
          unlockScroll("down");
          setTimeout(
            () => window.scrollBy({ top: 80, behavior: "smooth" }),
            80,
          );
        }
      } else {
        if (cur > 0) {
          setActiveCard(cur - 1);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 750);
        } else {
          unlockScroll("up");
          setTimeout(
            () => window.scrollBy({ top: -80, behavior: "smooth" }),
            80,
          );
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [unlockScroll]);

  /* ── Cleanup on unmount ── */
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        background: "#0a0f14",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Flash overlay on exit */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 200,
          background: "#08bcd4",
          opacity: flashOpacity,
          pointerEvents: "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Lock indicator */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: isLocked ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#08bcd4",
            boxShadow: "0 0 12px #08bcd4",
            animation: isLocked ? "pulse 1.5s ease infinite" : "none",
          }}
        />
        <span
          style={{
            color: "#08bcd4",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Scroll to explore
        </span>
      </div>

      {/* Header */}
      <div
        style={{ textAlign: "center", padding: "48px 24px 0", flexShrink: 0 }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(8,131,149,0.15)",
            color: "#08bcd4",
            padding: "5px 16px",
            borderRadius: "999px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "16px",
            border: "1px solid rgba(8,188,212,0.2)",
          }}
        >
          Case Studies
        </span>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          Our Evaluation Framework
        </h2>
        <p style={{ color: "#5a7a8a", fontSize: "15px", margin: 0 }}>
          Explore our methodology — scroll to cycle through all {CARDS.length}{" "}
          dimensions
        </p>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          {CARDS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeCard ? "28px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background:
                  i === activeCard
                    ? "#08bcd4"
                    : i < activeCard
                      ? `${CARDS[i].color}80`
                      : "rgba(255,255,255,0.15)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        {/* Step counter */}
        <div
          style={{
            color: "#3a5a6a",
            fontSize: "12px",
            marginTop: "10px",
            fontWeight: 500,
          }}
        >
          {activeCard + 1} / {CARDS.length}
        </div>
      </div>

      {/* Card Stack */}
      <div style={{ position: "relative", flex: 1 }}>
        {CARDS.map((card, index) => (
          <Card key={index} card={card} index={index} activeCard={activeCard} />
        ))}
      </div>

      {/* Bottom scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, transparent, #08bcd4)",
            animation: "scrollLine 1.5s ease infinite",
          }}
        />
        <span
          style={{
            color: "#3a5a6a",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {activeCard === CARDS.length - 1 ? "Keep scrolling" : "Scroll down"}
        </span>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @keyframes scrollLine { 0%{opacity:0;transform:scaleY(0);transform-origin:top} 50%{opacity:1;transform:scaleY(1)} 100%{opacity:0;transform:scaleY(1);transform-origin:bottom} }
      `}</style>
    </section>
  );
};

/* ─────────────────────────────────────────────
   DEMO LANDING PAGE SECTIONS
───────────────────────────────────────────── */
const HeroSection = () => (
  <section
    style={{
      height: "100vh",
      background: "linear-gradient(160deg, #050c12 0%, #0a1a24 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 24px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Background grid */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.04,
        backgroundImage:
          "linear-gradient(#08bcd4 1px, transparent 1px), linear-gradient(90deg, #08bcd4 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        style={{
          display: "inline-block",
          background: "rgba(8,131,149,0.15)",
          color: "#08bcd4",
          padding: "6px 18px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "28px",
          border: "1px solid rgba(8,188,212,0.2)",
        }}
      >
        Welcome to our platform
      </div>
      <h1
        style={{
          fontSize: "clamp(3rem, 8vw, 6rem)",
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 24px",
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
        }}
      >
        Build Something
        <br />
        <span style={{ color: "#08bcd4" }}>Extraordinary</span>
      </h1>
      <p
        style={{
          color: "#5a7a8a",
          fontSize: "18px",
          maxWidth: "500px",
          margin: "0 auto 40px",
          lineHeight: 1.7,
        }}
      >
        A next-generation platform for teams who demand excellence in design and
        engineering.
      </p>
      <button
        style={{
          background: "linear-gradient(135deg, #0C7779, #088395)",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "16px 36px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.01em",
        }}
      >
        Get Started →
      </button>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "#3a5a6a",
        fontSize: "12px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      ↓ Scroll down
    </div>
  </section>
);

const AboutSection = () => (
  <section
    style={{
      minHeight: "100vh",
      background: "#060e14",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 48px",
    }}
  >
    <div style={{ maxWidth: "900px", width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              background: "rgba(8,131,149,0.15)",
              color: "#08bcd4",
              padding: "5px 16px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "24px",
              border: "1px solid rgba(8,188,212,0.2)",
            }}
          >
            About Us
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            We craft experiences that matter
          </h2>
          <p
            style={{
              color: "#5a7a8a",
              fontSize: "16px",
              lineHeight: 1.8,
              margin: "0 0 16px",
            }}
          >
            Our team combines deep technical expertise with a relentless focus
            on user experience. Every pixel, every interaction is intentional.
          </p>
          <p style={{ color: "#5a7a8a", fontSize: "16px", lineHeight: 1.8 }}>
            Scroll down to explore our evaluation framework — the methodology we
            apply to every project we take on.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {[
            ["120+", "Projects"],
            ["98%", "Satisfaction"],
            ["5+", "Years"],
            ["40+", "Experts"],
          ].map(([val, label]) => (
            <div
              key={label}
              style={{
                background: "linear-gradient(135deg, #111c24, #0d1a22)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#08bcd4",
                  lineHeight: 1,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#5a7a8a",
                  marginTop: "6px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section
    style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #060e14, #020810)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 24px",
      textAlign: "center",
    }}
  >
    <span
      style={{
        display: "inline-block",
        background: "rgba(8,131,149,0.15)",
        color: "#08bcd4",
        padding: "5px 16px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "24px",
        border: "1px solid rgba(8,188,212,0.2)",
      }}
    >
      Get In Touch
    </span>
    <h2
      style={{
        fontSize: "clamp(2.5rem, 6vw, 4rem)",
        fontWeight: 900,
        color: "#fff",
        margin: "0 0 20px",
        letterSpacing: "-0.03em",
      }}
    >
      Let's work together
    </h2>
    <p
      style={{
        color: "#5a7a8a",
        fontSize: "18px",
        maxWidth: "480px",
        margin: "0 auto 48px",
        lineHeight: 1.7,
      }}
    >
      Ready to build something extraordinary? Our team is here to help bring
      your vision to life.
    </p>
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          background: "linear-gradient(135deg, #0C7779, #088395)",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "16px 36px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Start a Project
      </button>
      <button
        style={{
          background: "transparent",
          color: "#08bcd4",
          border: "1px solid rgba(8,188,212,0.4)",
          borderRadius: "12px",
          padding: "16px 36px",
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        View Portfolio
      </button>
    </div>
    <div style={{ marginTop: "80px", color: "#2a4050", fontSize: "12px" }}>
      © 2026 Studio. All rights reserved.
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function NewCaseStudies() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#050c12",
      }}
    >
      <HeroSection />
      <AboutSection />
      {/* ← The pinned section lives here, in the middle */}
      <PinnedCardSection />
      <ContactSection />
    </div>
  );
}
