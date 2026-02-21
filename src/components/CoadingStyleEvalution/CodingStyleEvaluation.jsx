import React, { useState, useRef, useLayoutEffect } from "react";
import {
  ChevronDown,
  Check,
  AlertCircle,
  Lightbulb,
  Code,
  Zap,
  ArrowRight,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CodingStyleEvaluation = () => {
  const [activeCard, setActiveCard] = useState(0);
  const scrollContainerRef = useRef(null);

  const cards = [
    {
      category: "Technology",
      title: "Code Structure & Organization",
      description: "How you organize components, files, and logic",
      metric1: { value: "85%", label: "Structure Score" },
      metric2: { value: "Good", label: "Organization" },
      details:
        "Your requirements are clear and well-structured. You specify tech stack upfront (React, Tailwind CSS).",
      color: "#96b5f8ff",
      img: "/lawyer.png"
    },
    {
      category: "Finance",
      title: "Specification Clarity",
      description: "How clearly you define requirements and constraints",
      metric1: { value: "90%", label: "Clarity Score" },
      metric2: { value: "Excellent", label: "Detail Level" },
      details:
        "Great detail: dimensions, responsive requirements, animation behavior all specified.",
      color: "#729bf5ff",
      img: "/ecommerce.png"
    },
    {
      category: "Home Decorate",
      title: "UX & Interaction Design",
      description: "Your approach to user experience and interactions",
      metric1: { value: "95%", label: "UX Awareness" },
      metric2: { value: "Strong", label: "Interaction Focus" },
      details:
        "Excellent attention to scroll behavior, smooth transitions, responsive design.",
      color: "#aec7ffff",
      img: "/perfume.png"
    },
    {
      category: "Technology",
      title: "Technical Communication",
      description: "How you communicate technical concepts",
      metric1: { value: "75%", label: "Communication" },
      metric2: { value: "Improving", label: "Documentation" },
      details:
        "Room to improve clarity. Consider bullet points for complex specs.",
      color: "#8db0fcff",
      img: "/padma.jpg"
    },
    {
      category: "Development",
      title: "Flexibility & Best Practices",
      description: "Your awareness of tools and modern practices",
      metric1: { value: "88%", label: "Best Practices" },
      metric2: { value: "Flexible", label: "Approach" },
      details:
        "You're open to using libraries which shows pragmatism.",
      color: "#aec7ffff",
      img: "/perfume.png"
    },
  ];

  // ✅ SCROLLTRIGGER (ONLY CHANGE)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = cards.length;

      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: "top top",
        end: `+=${total * 100}%`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (total - 1),
          duration: 0.5,
          ease: "power2.out",
        },
        onUpdate: (self) => {
          const step = Math.round(self.progress * (total - 1));
          setActiveCard(step);
        },
      });
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  // ✅ YOUR ORIGINAL DESIGN (UNCHANGED)
  // const getCardStyle = (index) => {
  //   let diff = index - activeCard;

  //   if (diff > 2) diff -= cards.length;
  //   if (diff < -2) diff += cards.length;

  //   const scale = diff === 0 ? 1 : 1.05 - Math.abs(diff) * 0.15;
  //   const opacity = diff === 0 ? 1 : 1;
  //   const translateY = diff * 90;
  //   const zIndex = 50 - Math.abs(diff);

  //   return {
  //     transform: `translateY(${translateY}px) scale(${scale})`,
  //     opacity,
  //     zIndex,
  //     transition:
  //       "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s",
  //     pointerEvents: diff === 0 ? "auto" : "none",
  //   };
  // };

  const getCardStyle = (index) => {
    let diff = index - activeCard;

    if (diff > 2) diff -= cards.length;
    if (diff < -2) diff += cards.length;

    // 📱 Responsive values
    const isMobile = window.innerWidth < 768;

    const gap = isMobile ? 40 : 60;        // spacing
    const scaleStep = isMobile ? 0.13 : 0.15;

    const scale = diff === 0 ? 1 : 1.05 - Math.abs(diff) * scaleStep;
    const translateY = diff * gap;
    const zIndex = 50 - Math.abs(diff);

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity: 1,
      zIndex,
      transition:
        "transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s",
      pointerEvents: diff === 0 ? "auto" : "none",
    };
  };

  return (
    <>
      {/* 🔝 PREVIOUS SECTION */}
      <section className="h-screen flex items-center justify-center bg-blue-300">
        <h1 className="text-5xl font-bold">Intro Section</h1>
      </section>

      {/* ✅ PINNED CARD SECTION */}
      <section ref={scrollContainerRef} className="relative h-screen bg-white">
        <div className=" flex items-center justify-center py-4 md:py-[32px] md:h-full md:max-w-[900px] lg:max-w-[1000px] xl:max-w-[1100px] mx-auto px-4">
          <div
            className="relative w-full"
            // style={{ height: "600px" }}
            // style={{ height: "clamp(400px, 70vh, 500px)" }}
            style={{
              height: window.innerWidth < 768
                ? "clamp(400px, 100vh, 700px)"
                : "clamp(400px, 70vh, 500px)"
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center card py-[10px] md:py-[32px]"
                style={getCardStyle(index)}
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${card.color} rounded-3xl shadow-2xl overflow-hidden`}
                  style={{ backgroundColor: card.color }}
                >
                  <div className="h-full flex flex-col sm:flex-row">
                    {/* LEFT */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-[24px] flex flex-col justify-between">
                      <div>
                        <span className="text-black text-sm">
                          {card.category}
                        </span>

                        <h2 className="text-[24px] md:text-4xl font-bold text-[#000]">
                          {card.title}
                        </h2>
                        <p className="text-[#000] mb-[24px]">
                          {card.description}
                        </p>
                      </div>

                      <div>
                        <div className="flex gap-10 mb-6">
                          <div>
                            <div className="text-4xl font-bold text-[#000]">
                              {card.metric1.value}
                            </div>
                            <div className="text-[#000] text-sm">
                              {card.metric1.label}
                            </div>
                          </div>
                          <div>
                            <div className="text-4xl font-bold text-[#000]">
                              {card.metric2.value}
                            </div>
                            <div className="text-[#000] text-sm">
                              {card.metric2.label}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-white text-sm">
                        {/* {card.details} */}
                        <button className="bg-black px-4 py-3 rounded-full flex items-center gap-2">View Details <ArrowRight size={20} /></button>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1 lg:flex items-center justify-center py-4 md:py-8 px-4 md:px-8 rounded-xl">
                      {/* {index === 0 && <Code className="w-32 h-32 text-white/40" />}
                      {index === 1 && <Lightbulb className="w-32 h-32 text-white/40" />}
                      {index === 2 && <Check className="w-32 h-32 text-white/40" />}
                      {index === 3 && <AlertCircle className="w-32 h-32 text-white/40" />}
                      {index === 4 && <Zap className="w-32 h-32 text-white/40" />} */}

                      <img
                        src={card.img}
                        alt=""
                        className="w-full h-full object-center rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔽 NEXT SECTION */}
      <section className="h-screen flex items-center justify-center bg-blue-300">
        <h1 className="text-5xl font-bold">Next Section</h1>
      </section>
    </>
  );
};

export default CodingStyleEvaluation;