import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CaseStudies2 = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const total = cards.length;

      const stackOffset = 12;
      const scaleOffset = 0.06;

      const updateCards = (progress = 0) => {
        const shift = progress * (total - 1);

        cards.forEach((card, i) => {
          let position = i - shift;
          if (position < 0) position += total;

          const centered = position - (total - 1) / 2;

          gsap.set(card, {
            yPercent: centered * stackOffset,
            scale: 1 - Math.abs(centered) * scaleOffset,
            zIndex: total - Math.abs(Math.round(centered)),
            autoAlpha: Math.abs(centered) <= 2 ? 1 : 0, // only 5 visible
          });
        });
      };

      // 🔥 FORCE INITIAL STATE
      updateCards(0);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${total * 400}`,
        scrub: 0.5,
        pin: true,
        snap: {
          snapTo: 1 / (total - 1),
          duration: 0.3,
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          updateCards(self.progress);
        },
      });

      // 🔥 Force refresh after layout
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const data = [
    {
      title: "Modern Architecture",
      desc: "A clean and elegant building design concept with modern aesthetics.",
      img: "/img1.png",
      color: "#aec7ffff",
    },
    {
      title: "Creative Workspace",
      desc: "Designed for productivity and comfort with a minimal approach.",
      img: "/img2.png",
      color: "#8db0fcff",
    },
    {
      title: "Urban Design",
      desc: "Combining structure and simplicity for better living.",
      img: "/img3.png",
      color: "#aec7ffff",
    },
    {
      title: "Interior Concept",
      desc: "Smart and aesthetic interior layout with clean spacing.",
      img: "/img4.png",
      color: "#8db0fcff",
    },
    {
      title: "Future Vision",
      desc: "A next-generation design system built for scalability.",
      img: "/img5.png",
      color: "#aec7ffff",
    },
  ];

  return (
    <section className="bg-white py-24">
      {/* 🔼 TOP HEADING (Normal Scroll) */}
      <div className="text-center mb-4">
        <h2 className="text-5xl font-bold">Our Case Studies</h2>
        <p className="text-gray-600 mt-4">
          Explore our latest creative works and innovations.
        </p>
      </div>

      {/* 🔥 PINNED CARD AREA ONLY */}
      <div
        ref={containerRef}
        className="h-screen overflow-hidden flex items-center justify-center"
      >
        <ul className="relative w-[1100px] h-[480px]">
          {data.map((item, index) => (
            <li
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ backgroundColor: item.color }}
              className="absolute w-full h-full rounded-2xl shadow-2xl flex items-center justify-between p-12"
            >
              {/* LEFT */}
              <div className="w-1/2 space-y-6 text-white">
                <h2 className="text-4xl font-bold">{item.title}</h2>
                <p>{item.desc}</p>
                <button className="px-6 py-3 bg-black text-white rounded-lg">
                  View Details
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="w-1/2 flex justify-end">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[400px] h-[400px] object-cover rounded-xl"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔽 BOTTOM BUTTON (Normal Scroll) */}
      <div className="text-center mt-4">
        <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          View All Case Studies
        </button>
      </div>
    </section>
  );
};

export default CaseStudies2;
