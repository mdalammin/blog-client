import { useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: "Illustrations",
    count: 6,
    highlight: "Bringing Ideas to Life",
    description:
      "We create beautiful and engaging illustrations that bring your ideas to life, perfect for brands, products, and storytelling.",
  },
  {
    id: 2,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: "3D",
    count: 6,
    highlight: "Stunning Visuals in Every Dimension",
    description:
      "From product renders to immersive scenes, we design high-quality 3D visuals that look stunning and feel real.",
  },
  {
    id: 3,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: "Development",
    count: 5,
    highlight: "Websites & Apps That Work",
    description:
      "We build smooth, fast, and user-friendly websites and apps that help businesses grow and stand out.",
    featured: true,
  },
  {
    id: 4,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Product Design",
    count: 9,
    highlight: "Crafting Digital Experiences",
    description:
      "We craft intuitive, visually striking digital products with user-focused UI/UX, seamlessly aligning with your brand and goals.",
  },
  {
    id: 5,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Branding",
    count: 7,
    highlight: "Making Brands Unforgettable",
    description:
      "We help brands find their voice and identity with unique logos, colors, and visuals that make a lasting impression.",
  },
  {
    id: 6,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Animation",
    count: 8,
    highlight: "Bringing Motion to Design",
    description:
      "We bring designs to life with smooth and engaging animations, making content more dynamic and fun.",
  },
];

const TOTAL = services.length; // 6 rows
const CLOSED = 62; // collapsed row height
const OPEN = 210; // expanded row height
// Total section height = one row open + rest closed. FIXED FOREVER.
const SECTION_H = OPEN + (TOTAL - 1) * CLOSED;

const ease = [0.4, 0, 0.2, 1];

const ArrowUpRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function ServicesAccordion() {
  // default open = featured (Development)
  const defaultId = services.find((s) => s.featured)?.id ?? services[0].id;
  const [activeId, setActiveId] = useState(defaultId);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Serif+Display&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#aaa",
            marginBottom: 28,
            fontWeight: 400,
          }}
        >
          Services
        </p>

        {/*
          SECTION HEIGHT IS LOCKED.
          overflow:hidden clips everything. Nothing outside this box ever moves.
        */}
        <div
          style={{
            height: SECTION_H,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {services.map((svc) => {
            const active = activeId === svc.id;
            const rowH = active ? OPEN : CLOSED;

            return (
              <motion.div
                key={svc.id}
                animate={{ height: rowH }}
                transition={{ duration: 0.42, ease }}
                onMouseEnter={() => setActiveId(svc.id)}
                style={{
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "pointer",
                  background: active ? "#0d0d0d" : "transparent",
                  color: active ? "#fff" : "#111",
                  borderRadius: active ? 8 : 0,
                  borderBottom: active ? "none" : "1px solid #e8e8e8",
                  transition:
                    "background 0.32s ease, color 0.32s ease, border-radius 0.32s ease, border-color 0.32s ease",
                }}
              >
                {/* ── Header ── */}
                <div
                  style={{
                    height: CLOSED,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 20px",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 11 }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        transition: "transform 0.25s ease",
                        transform: active ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {svc.icon}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {svc.title}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        opacity: active ? 0.7 : 0,
                        transform: active ? "translateX(0)" : "translateX(8px)",
                        transition: "opacity 0.22s ease, transform 0.22s ease",
                      }}
                    >
                      Explore our works
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        opacity: active ? 0 : 0.35,
                        transition: "opacity 0.22s ease",
                      }}
                    >
                      {svc.count}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        opacity: active ? 1 : 0.3,
                        transition: "opacity 0.22s ease",
                      }}
                    >
                      <ArrowUpRight />
                    </span>
                  </div>
                </div>

                {/* ── Body ── always rendered, fades in, never causes reflow */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 28,
                    padding: "0 20px 24px 20px",
                    opacity: active ? 1 : 0,
                    transition: "opacity 0.2s ease",
                    pointerEvents: active ? "auto" : "none",
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 88,
                        lineHeight: 0.88,
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {svc.count}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        opacity: 0.4,
                        marginTop: 6,
                      }}
                    >
                      Projects
                    </div>
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        marginBottom: 8,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {svc.highlight}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        opacity: 0.5,
                        maxWidth: 400,
                        fontWeight: 300,
                      }}
                    >
                      {svc.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
