import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    title: "Creative Design",
    desc: "We build modern and engaging UI experiences that combine aesthetics with usability. Our design approach focuses on clarity, emotion, and functionality to ensure every interaction feels intuitive and memorable for users across all devices.",
    image: "/1.png",
  },
  {
    id: 2,
    title: "Development",
    desc: "We develop high-performance and scalable applications using modern technologies and best practices. Our solutions are optimized for speed, security, and maintainability, ensuring long-term growth and seamless user experiences.",
    image: "/2.jpg",
  },
  {
    id: 3,
    title: "Brand Strategy",
    desc: "We craft strong brand identities that communicate your vision and values effectively. From research and positioning to visual systems and messaging, we help businesses stand out and build meaningful connections with their audience.",
    image: "/3.png",
  },
  {
    id: 4,
    title: "Digital Marketing",
    desc: "We create result-driven marketing strategies that increase visibility, engagement, and conversions. Through data analysis, targeted campaigns, and performance optimization, we help brands grow consistently in competitive markets.",
    image: "/4.png",
  },
];

export default function ImageSliderScroll() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let props = gsap.getProperty("#id", "backgroundColor");

    const ctx = gsap.context(() => {
      const content = gsap.utils.toArray(".content");
      const sections = gsap.utils.toArray(".panel");

      const animation = gsap.to(".image:not(:first-child)", {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 1,
        clipPath: "inset(0% 0% 0%)",
        // scale:1,
        snap: true,
      });

      sections.forEach((section) => {
        const content = section.querySelector(".content");
        const image = section.querySelector(".image");

        gsap.set(".image:not(:first-child)", {
          opacity: 1,
          scale: 1,
          clipPath: "inset(100% 0% 0%)",
        });

        gsap.set(".image img", {
          y: 5,
        });

        gsap.to(".image img", {
          y: -5,
          duration: 1,
          repeat: -1, // same dik theke bar bar repeat hobe
          yoyo: true, // ek dik theke jabe abr ulta dike ashbe ei vabe yoyo khelar moto
          ease: "power1.inOut",
        });
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        animation: animation,
        scrub: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="gallery relative">
      {slides.map((slide) => (
        <section
          key={slide.id}
          className="panel min-h-screen flex items-center justify-between px-20"
        >
          {/* Left Side */}
          <div className="content w-1/2">
            <h1 className="text-5xl font-bold mb-6">{slide.title}</h1>
            <p className="text-lg text-gray-600 max-w-md">{slide.desc}</p>
          </div>

          {/* Right Side */}
          <div className="image w-1/2 flex justify-center absolute right-0 top-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="max-h-[70vh] object-contain"
            />
          </div>
        </section>
      ))}
    </div>
  );
}
