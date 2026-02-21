import React, { useEffect, useRef, useState } from "react";
import { Check, AlertCircle, Lightbulb, Code, Zap } from "lucide-react";

import "./style.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const PinnedSection = () => {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      category: "Technology",
      title: "Comprehensive Code Structure & Component Organization Strategies",
      description:
        "An in-depth approach to organizing components, files, and business logic to maximize maintainability and scalability across projects.",
      metric1: { value: "20.5%", label: "Traffic Increase" },
      metric2: { value: "20.5M", label: "Current Impression" },
      details: "Your requirements are clear and well-structured.",
      color: "#aec7ffff",
    },
    {
      category: "Finance",
      title:
        "Detailed Specification Clarity for Financial Systems and Constraints",
      description:
        "Thorough explanation on defining requirements and constraints clearly to avoid ambiguity in complex financial applications.",
      metric1: { value: "35.7%", label: "Traffic Increase" },
      metric2: { value: "45.8M", label: "Current Impression" },
      details: "Great detail: dimensions and animation behavior specified.",
      color: "#8db0fcff",
    },
    {
      category: "Home Decorate",
      title: "Advanced UX & Interaction Design Principles for Home Decor",
      description:
        "Your strategic approach to enhancing user experience and interaction, focusing on responsiveness and intuitive design.",
      metric1: { value: "42.9%", label: "Traffic Increase" },
      metric2: { value: "38.2M", label: "Current Impression" },
      details: "Excellent attention to scroll behavior and transitions.",
      color: "#aec7ffff",
    },
    {
      category: "Technology",
      title: "Effective Technical Communication in Software Projects",
      description:
        "Techniques for communicating complex technical concepts clearly to cross-functional teams and stakeholders.",
      metric1: { value: "18.4%", label: "Traffic Increase" },
      metric2: { value: "27.6M", label: "Current Impression" },
      details: "Consider clearer bullet points for complex specs.",
      color: "#8db0fcff",
    },
    {
      category: "Development",
      title: "Maximizing Flexibility & Applying Best Practices in Development",
      description:
        "Insights into adopting modern development tools and best practices to maintain high-quality, scalable codebases.",
      metric1: { value: "29.1%", label: "Traffic Increase" },
      metric2: { value: "33.4M", label: "Current Impression" },
      details: "You're open to using libraries pragmatically.",
      color: "#aec7ffff",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (cards.length - 1),
          delay: 0.1,
          duration: 0.4,
          ease: "power2.inOut",
        },
        markers: true,
        // ease: "power1.out",
        onUpdate: (self) => {
          const index = Math.floor(self.progress * cards.length);
          setActiveCard(Math.min(index, cards.length - 1));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCardStyle = (index) => {
    let diff = index - activeCard;

    if (diff > 2) diff -= cards.length;
    if (diff < -2) diff += cards.length;

    const isMobile = window.innerWidth < 768;

    // const scale = diff === 0 ? 1 : 1.05 - Math.abs(diff) * 0.15;
    const scale = diff === 0 ? 1 : 1 - Math.abs(diff) * 0.15;

    const opacity = diff === 0 ? 1 : 1;
    const translateY = isMobile ? diff * 60 : diff * 70;
    const zIndex = 50 - Math.abs(diff);

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex,
      //   transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s",
      //   transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s",
      transition: "all 0.9s cubic-bezier(0.4, 0, 0.2, 1)",

      pointerEvents: diff === 0 ? "auto" : "none",
    };
  };

  return (
    <>
      <section style={{ height: "100vh", background: "#fff" }} className="intro">
        Scroll Down
      </section>

      <section
        ref={sectionRef}
        className="sticky-cards"
        style={{ minHeight: "100vh" }}
      >
        <div className="flex flex-col items-center justify-center h-full px-4">
          <div
            className="relative w-full max-w-7xl mx-auto px-4"
            style={{ height: "100vh" }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                style={getCardStyle(index)}
              >
                <div
                  className="w-full h-[500px] rounded-3xl shadow-2xl overflow-hidden"
                  style={{ backgroundColor: card.color }}
                >
                  <div className="h-full flex flex-col lg:flex-row px-[32px] py-[24px]">
                    {/* Left Content */}
                    <div className="flex-1 flex flex-col justify-between text-black">
                      <h3 className="text-[20px]">{card.category}</h3>
                      <div>
                        <h2 className="text-4xl font-bold mb-4">
                          {card.title}
                        </h2>
                        <p className="mb-6">{card.description}</p>
                      </div>
                      <div className="flex gap-12">
                        <div>
                          <div className="text-5xl font-bold">
                            {card.metric1.value}
                          </div>
                          <div className="text-sm opacity-80">
                            {card.metric1.label}
                          </div>
                        </div>

                        <div>
                          <div className="text-5xl font-bold">
                            {card.metric2.value}
                          </div>
                          <div className="text-sm opacity-80">
                            {card.metric2.label}
                          </div>
                        </div>
                      </div>

                      <button className="card-button w-fit bg-black text-white px-6 py-3 rounded-full text-sm font-medium">
                        View Details →
                      </button>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 items-center justify-center card-image w-full h-full rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src="/case.png"
                        alt=""
                        className="w-full h-full object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ height: "100vh", background: "#2a9d8f" }} className="outro">
        Next Section
      </section>
    </>
  );
};

export default PinnedSection;
