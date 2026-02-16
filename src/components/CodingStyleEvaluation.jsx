import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Check,
  AlertCircle,
  Lightbulb,
  Code,
  Zap,
} from "lucide-react";

const CodingStyleEvaluation = () => {
  const [activeCard, setActiveCard] = useState(2); // Start with 3rd card (index 2) in center
  const scrollContainerRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Demo data for the cards based on the image reference
  const cards = [
    {
      category: "Technology",
      title: "Code Structure & Organization",
      description: "How you organize components, files, and logic",
      metric1: { value: "85%", label: "Structure Score" },
      metric2: { value: "Good", label: "Organization" },
      details:
        "Your requirements are clear and well-structured. You specify tech stack upfront (React, Tailwind CSS).",
      color: "from-blue-400 to-blue-600",
    },
    {
      category: "Finance",
      title: "Specification Clarity",
      description: "How clearly you define requirements and constraints",
      metric1: { value: "90%", label: "Clarity Score" },
      metric2: { value: "Excellent", label: "Detail Level" },
      details:
        "Great detail: dimensions (width: full, height: 600px), responsive requirements, animation behavior all specified.",
      color: "from-purple-400 to-purple-600",
    },
    {
      category: "Home Decorate",
      title: "UX & Interaction Design",
      description: "Your approach to user experience and interactions",
      metric1: { value: "95%", label: "UX Awareness" },
      metric2: { value: "Strong", label: "Interaction Focus" },
      details:
        "Excellent attention to scroll behavior, smooth transitions, responsive design. You're thinking about the end user.",
      color: "from-green-400 to-green-600",
    },
    {
      category: "Technology",
      title: "Technical Communication",
      description: "How you communicate technical concepts",
      metric1: { value: "75%", label: "Communication" },
      metric2: { value: "Improving", label: "Documentation" },
      details:
        "Room to improve: 'initially 5 cards visible one is in the center' could be clearer. Consider bullet points for complex specs.",
      color: "from-orange-400 to-orange-600",
    },
    {
      category: "Development",
      title: "Flexibility & Best Practices",
      description: "Your awareness of tools and modern practices",
      metric1: { value: "88%", label: "Best Practices" },
      metric2: { value: "Flexible", label: "Approach" },
      details:
        "You're open to using libraries ('any react library for better transition') which shows pragmatism over reinventing wheels.",
      color: "from-pink-400 to-pink-600",
    },
  ];

  useEffect(() => {
    let scrollTimeout;

    const handleWheel = (e) => {
      if (isScrollingRef.current) return;

      e.preventDefault();

      // Clear any existing timeout
      clearTimeout(scrollTimeout);

      // Determine scroll direction
      const delta = e.deltaY;

      if (Math.abs(delta) > 10) {
        // Threshold to avoid accidental scrolls
        isScrollingRef.current = true;

        if (delta > 0) {
          // Scroll down - next card
          if (activeCard < cards.length - 1) {
            setActiveCard((prev) => prev + 1);
          } else {
            // At last card, go back to first card
            setActiveCard(0);
          }
        } else if (delta < 0) {
          // Scroll up - previous card
          if (activeCard > 0) {
            setActiveCard((prev) => prev - 1);
          } else {
            // At first card, go to last card
            setActiveCard(cards.length - 1);
          }
        }

        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800); // Match this with CSS transition duration
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [activeCard, cards.length]);

  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isScrollingRef.current) return;

      const deltaY = touchStartY - touchEndY;

      // Minimum swipe distance threshold (50px)
      if (Math.abs(deltaY) > 50) {
        isScrollingRef.current = true;

        if (deltaY > 0) {
          // Swipe up - next card
          if (activeCard < cards.length - 1) {
            setActiveCard((prev) => prev + 1);
          } else {
            setActiveCard(0);
          }
        } else {
          // Swipe down - previous card
          if (activeCard > 0) {
            setActiveCard((prev) => prev - 1);
          } else {
            setActiveCard(cards.length - 1);
          }
        }

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }

      // Reset touch positions
      touchStartY = 0;
      touchEndY = 0;
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [activeCard, cards.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isScrollingRef.current) return;

      if (e.key === "ArrowDown") {
        isScrollingRef.current = true;
        if (activeCard < cards.length - 1) {
          setActiveCard((prev) => prev + 1);
        } else {
          setActiveCard(0); // Wrap to first card
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      } else if (e.key === "ArrowUp") {
        isScrollingRef.current = true;
        if (activeCard > 0) {
          setActiveCard((prev) => prev - 1);
        } else {
          setActiveCard(cards.length - 1); // Wrap to last card
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCard, cards.length]);

  const getCardStyle = (index) => {
    // Calculate position relative to active card
    let diff = index - activeCard;

    // Handle wrapping for smooth visual transition
    // If card is more than 2 positions away, wrap it around
    if (diff > 2) diff -= cards.length;
    if (diff < -2) diff += cards.length;

    // Center card (diff = 0) is fully visible and scaled to 1
    // Cards above and below are stacked with decreasing scale and opacity
    const scale = diff === 0 ? 1 : 0.85 - Math.abs(diff) * 0.08;
    const opacity = diff === 0 ? 1 : 0.4;

    // Vertical positioning: spread cards above and below center
    const translateY = diff * 120; // 120px spacing between cards

    // Z-index: center card on top, then cards closer to center
    const zIndex = 50 - Math.abs(diff);

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      pointerEvents: diff === 0 ? "auto" : "none", // Only center card is interactive
    };
  };

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Header */}
      {/* <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Code className="w-6 h-6" />
                Your Coding Style Evaluation
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Scroll to explore • Card {activeCard + 1} of {cards.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">85%</div>
              <div className="text-slate-400 text-sm">Overall Score</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Scroll Indicator */}
      <div className="fixed top-24 right-8 z-50 hidden lg:block">
        <div className="flex flex-col gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isScrollingRef.current) {
                  isScrollingRef.current = true;
                  setActiveCard(index);
                  setTimeout(() => {
                    isScrollingRef.current = false;
                  }, 800);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer ${
                index === activeCard ? "bg-blue-500 scale-150" : "bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fixed Container for Cards */}
      <div className="fixed inset-0 flex items-center justify-center pt-24 pb-8">
        <div
          className="relative w-full max-w-4xl mx-auto px-4"
          style={{ height: "600px" }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              style={getCardStyle(index)}
            >
              <div
                className={`w-full h-[600px] bg-gradient-to-br ${card.color} rounded-3xl shadow-2xl overflow-hidden`}
              >
                <div className="h-full flex flex-col lg:flex-row">
                  {/* Left Side - Content */}
                  <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                    {/* Category Tag */}
                    <div className="inline-block">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        {card.category}
                      </span>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        {card.title}
                      </h2>
                      <p className="text-white/90 text-lg mb-8">
                        {card.description}
                      </p>

                      {/* Metrics */}
                      <div className="flex gap-12 mb-8">
                        <div>
                          <div className="text-5xl font-bold text-white mb-2">
                            {card.metric1.value}
                          </div>
                          <div className="text-white/80 text-sm">
                            {card.metric1.label}
                          </div>
                        </div>
                        <div>
                          <div className="text-5xl font-bold text-white mb-2">
                            {card.metric2.value}
                          </div>
                          <div className="text-white/80 text-sm">
                            {card.metric2.label}
                          </div>
                        </div>
                      </div>

                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors w-fit">
                        View Details →
                      </button>
                    </div>

                    {/* Details Footer */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                      <p className="text-white/90 text-sm leading-relaxed">
                        {card.details}
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Visual */}
                  <div className="hidden lg:flex lg:w-2/5 items-center justify-center p-8">
                    <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border-4 border-white/20 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                      {index === 0 && (
                        <Code className="w-32 h-32 text-white/40" />
                      )}
                      {index === 1 && (
                        <Lightbulb className="w-32 h-32 text-white/40" />
                      )}
                      {index === 2 && (
                        <Check className="w-32 h-32 text-white/40" />
                      )}
                      {index === 3 && (
                        <AlertCircle className="w-32 h-32 text-white/40" />
                      )}
                      {index === 4 && (
                        <Zap className="w-32 h-32 text-white/40" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodingStyleEvaluation;
