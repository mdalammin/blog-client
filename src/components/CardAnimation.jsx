import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Check,
  AlertCircle,
  Lightbulb,
  Code,
  Zap,
} from "lucide-react";

const CardAnimation = () => {
  const [activeCard, setActiveCard] = useState(2); // Start with 3rd card (index 2) in center
  const sectionRef = useRef(null);
  const isScrollingRef = useRef(false);
  const [isSticky, setIsSticky] = useState(false);
  const scrollProgressRef = useRef(0);

  // Demo data for the cards based on the image reference
  const cards = [
    {
      category: "Technology",
      img: "/img1.png",
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
      img: "/img2.png",
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
      img: "/img3.png",
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
      img: "/img4.png",
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
      img: "/img5.png",
      title: "Flexibility & Best Practices",
      description: "Your awareness of tools and modern practices",
      metric1: { value: "88%", label: "Best Practices" },
      metric2: { value: "Flexible", label: "Approach" },
      details:
        "You're open to using libraries ('any react library for better transition') which shows pragmatism over reinventing wheels.",
      color: "from-pink-400 to-pink-600",
    },
  ];

  // Handle scroll to control sticky behavior and card progression
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Check if section is in viewport
      if (sectionTop <= 0 && sectionTop > -(sectionHeight - viewportHeight)) {
        setIsSticky(true);

        // Calculate scroll progress through the section
        const scrolled = Math.abs(sectionTop);
        const maxScroll = sectionHeight - viewportHeight;
        const progress = Math.min(scrolled / maxScroll, 1);

        // Map progress to card index (0 to cards.length - 1)
        const cardIndex = Math.floor(progress * cards.length);
        const clampedIndex = Math.min(cardIndex, cards.length - 1);

        if (clampedIndex !== activeCard) {
          setActiveCard(clampedIndex);
        }
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
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
    const scale = diff === 0 ? 1 : 1.05 - Math.abs(diff) * 0.15;
    const opacity = diff === 0 ? 1 : 0.8;

    // Vertical positioning: spread cards above and below center
    const translateY = diff * 90; // 120px spacing between cards

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
    <div className="bg-slate-50">
      {/* Hero Section - Before sticky cards */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to Your Evaluation
          </h1>
          <p className="text-2xl mb-8">
            Scroll down to explore your coding style assessment
          </p>
          <ChevronDown className="w-12 h-12 mx-auto animate-bounce" />
        </div>
      </section>

      {/* Sticky Card Stack Section - This creates the scroll height */}
      <section
        ref={sectionRef}
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{ height: `${cards.length * 100}vh` }}
      >
        {/* Fixed/Sticky Container */}
        <div
          className={`${isSticky ? "fixed" : "absolute"} top-0 left-0 right-0 h-screen flex items-center justify-center mx-4`}
        >
          {/* Header */}

          {/* Cards Container */}
          <div
            className="relative w-full max-w-7xl mx-auto px-4"
            style={{ height: "600px" }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-center"
                style={getCardStyle(index)}
              >
                <div
                  className={`w-full h-[600px] bg-gradient-to-br ${card.color} rounded-3xl shadow-2xl overflow-hidden`}
                >
                  <div className="h-full flex flex-col lg:flex-row">
                    {/* Left Side - Content */}
                    <div className="flex-1 p-8 lg:px-12 flex flex-col justify-between">
                      {/* Category Tag */}
                      <div className="inline-block">
                        <span
                          className={`px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium`}
                        >
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
                    <div className="flex lg:w-2/5 items-center justify-center p-8">
                      <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border-4 border-white/20 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                        {/* {index === 0 && (
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
                        )} */}

                        <img
                          src={card.img}
                          alt={card.title}
                          className="w-[400px] h-[400px] object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section - After sticky cards */}
      <section className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            🎉 Evaluation Complete!
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Check className="w-6 h-6" />
                Strengths
              </h3>
              <ul className="text-white space-y-2">
                <li>• Clear technical specifications</li>
                <li>• Strong UX awareness</li>
                <li>• Responsive design mindset</li>
                <li>• Pragmatic about using libraries</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                Growth Areas
              </h3>
              <ul className="text-white space-y-2">
                <li>• Use bullet points for complex specs</li>
                <li>• Add visual mockups when possible</li>
                <li>• Specify edge cases and error states</li>
                <li>• Mention accessibility requirements</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">Next Steps</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Your coding style shows a strong foundation with clear technical
              communication and excellent attention to user experience. You
              understand the importance of responsive design and smooth
              interactions, which is crucial for modern web development.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Keep building, keep learning, and keep asking for feedback like
              this—it shows a growth mindset! 🚀
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardAnimation;
