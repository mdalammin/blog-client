import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Fullscreen } from "lucide-react";

// const services = [
//   {
//     id: 1,
//     icon: (
//       <svg
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <path d="M12 19l7-7 3 3-7 7-3-3z" />
//         <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
//         <circle cx="11" cy="11" r="2" />
//       </svg>
//     ),
//     title: "Illustrations",
//     count: 6,
//     highlight: "Bringing Ideas to Life",
//     description:
//       "We create beautiful and engaging illustrations that bring your ideas to life, perfect for brands, products, and storytelling.",
//   },
//   {
//     id: 2,
//     icon: (
//       <svg
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <circle cx="12" cy="12" r="10" />
//         <ellipse cx="12" cy="12" rx="10" ry="4" />
//         <line x1="2" y1="12" x2="22" y2="12" />
//       </svg>
//     ),
//     title: "3D",
//     count: 6,
//     highlight: "Stunning Visuals in Every Dimension",
//     description:
//       "From product renders to immersive scenes, we design high-quality 3D visuals that look stunning and feel real.",
//   },
//   {
//     id: 3,
//     icon: (
//       <svg
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <circle cx="12" cy="12" r="3" />
//         <circle cx="12" cy="12" r="10" />
//         <line x1="12" y1="2" x2="12" y2="5" />
//         <line x1="12" y1="19" x2="12" y2="22" />
//         <line x1="2" y1="12" x2="5" y2="12" />
//         <line x1="19" y1="12" x2="22" y2="12" />
//       </svg>
//     ),
//     title: "Development",
//     count: 5,
//     highlight: "Websites & Apps That Work",
//     description:
//       "We build smooth, fast, and user-friendly websites and apps that help businesses grow and stand out.",
//     featured: true,
//   },
//   {
//     id: 4,
//     icon: (
//       <svg
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <rect x="2" y="3" width="20" height="14" rx="2" />
//         <line x1="8" y1="21" x2="16" y2="21" />
//         <line x1="12" y1="17" x2="12" y2="21" />
//       </svg>
//     ),
//     title: "Product Design",
//     count: 9,
//     highlight: "Crafting Digital Experiences",
//     description:
//       "We craft intuitive, visually striking digital products with user-focused UI/UX, seamlessly aligning with your brand and goals.",
//   },
//   {
//     id: 5,
//     icon: (
//       <svg
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//       </svg>
//     ),
//     title: "Branding",
//     count: 7,
//     highlight: "Making Brands Unforgettable",
//     description:
//       "We help brands find their voice and identity with unique logos, colors, and visuals that make a lasting impression.",
//   },
//   {
//     id: 6,
//     icon: (
//       <svg
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//       </svg>
//     ),
//     title: "Animation",
//     count: 8,
//     highlight: "Bringing Motion to Design",
//     description:
//       "We bring designs to life with smooth and engaging animations, making content more dynamic and fun.",
//   },
// ];

const services = [
  {
    id: "software",
    title: "Software Development",
    url: "/services/software",
    description:
      "From custom ERPs to automated HR tools, we build secure software that scales",
    imageColor: "bg-blue-600",
    image: "/assets/newversion/services/software.webp",
    subServices: [
      {
        name: "Custom Software",
        url: "/services/software",
      },
      {
        name: "Mobile App",
        url: "/services/software/mobile-app",
      },
      {
        name: "ERP",
        url: "/services/software/erp",
      },
      {
        name: "E-Commerce",
        url: "/services/software/ecommerce",
      },
      {
        name: "CRM",
        url: "/services/software/crm",
      },
      {
        name: "HRMS",
        url: "/services/software/hr-management",
      },
    ],
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    url: "/services/digital-marketing/seo",
    description:
      "From Technical SEO to Global Link Building, we drive organic growth that pays.",
    imageColor: "bg-blue-500",
    image: "/assets/newversion/services/seo.webp",
    subServices: [
      {
        name: "SEO Audit Service",
        url: "/services/digital-marketing/seo/seo-audit",
      },
      {
        name: "Local SEO",
        url: "/services/digital-marketing/seo/local-seo",
      },
      {
        name: "Guest Post Services",
        url: "/services/digital-marketing/seo/guest-post",
      },
      {
        name: "SEO Services",
        url: "/services/digital-marketing/seo",
      },
      {
        name: "App Store Optimization",
        url: "/services/digital-marketing/seo/google-business-profile-optimization",
      },
      {
        name: "E-Commerce SEO",
        url: "/services/digital-marketing/seo/app-store-optimization",
      },
      {
        name: "Google Business Profile",
        url: "/services/digital-marketing/seo/google-business-profile-optimization",
      },
    ],
  },
  {
    id: "website",
    title: "Website Development",
    url: "/services/web-development",
    description:
      "From Shopify stores to custom SaaS, we build websites that convert.",
    imageColor: "bg-purple-600",
    image: "/assets/newversion/services/website.webp",
    subServices: [
      {
        name: "E-Commerce Website",
        url: "/services/web-development/ecommerce-website-development",
      },
      {
        name: "Website Speed Optimization",
        url: "/services/web-development/website-speed-optimization",
      },
      {
        name: "Website Maintenance",
        url: "/services/web-development/website-maintenance",
      },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    url: "/services/digital-marketing",
    description:
      "From Meta Ads to Lead Gen, we run campaigns that deliver ROI.",
    imageColor: "bg-green-600",
    image: "/assets/newversion/services/digitalmarketing.webp",
    subServices: [
      {
        name: "SEO",
        url: "/services/digital-marketing/seo",
      },
      {
        name: "Meta Ads",
        url: "/services/digital-marketing/media-buying/facebook-ads-management",
      },
      {
        name: "Google Ads",
        url: "/services/digital-marketing/media-buying/google-ads-management",
      },
      {
        name: "Social Media Marketing",
        url: "/services/digital-marketing",
      },
      {
        name: "Social Media Management",
        url: "/services/digital-marketing/social-media-management",
      },
      {
        name: "Reputation Management",
        url: "/services/digital-marketing/online-reputation-management",
      },
    ],
  },
  {
    id: "creative-design",
    title: "Creative Designing",
    url: "/services/creative-design/graphic-design",
    description:
      "From Logo Design to Brand Books, we create visuals that sell.",
    imageColor: "bg-orange-600",
    image: "/assets/newversion/services/creativedesign.webp",
    subServices: [
      {
        name: "UI/UX Design",
        url: "/services/creative-design/ui-ux-design",
      },
      {
        name: "Graphic Design",
        url: "/services/creative-design/graphic-design",
      },
      {
        name: "Brand Design",
        url: "/services/creative-design/graphic-design",
      },
      {
        name: "Logo Design",
        url: "/services/creative-design/graphic-design",
      },
      {
        name: "Motion Graphic Design",
        url: "/services/creative-design/motion-graphic",
      },
    ],
  },
  {
    id: "creative-content",
    title: "Creative Content",
    url: "/services/creative-content",
    description: "From social posts to viral copy, we write for results.",
    imageColor: "bg-red-600",
    image: "/assets/newversion/services/creativecontent.webp",
    subServices: [
      {
        name: "SEO Content Writing",
        url: "/services/creative-content",
      },
      {
        name: "Social Media Copywriting",
        url: "/services/creative-content",
      },
      {
        name: "Web Copywriting",
        url: "/services/creative-content",
      },
      {
        name: "OVC Scriptwriting",
        url: "/services/creative-content",
      },
      {
        name: "Social Media Content Planning",
        url: "/services/creative-content",
      },
      {
        name: "Content Marketing Strategy Planning",
        url: "/services/creative-content",
      },
    ],
  },
];

const TOTAL = services.length;
const CLOSED = 62;     // collapsed row height
const OPEN = 550;      // expanded row height (desktop)
const OPEN_MOB = 800;  // expanded row height (mobile – enough for all subservices)

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
  const defaultId = services.find((s) => s.featured)?.id ?? services[0].id;
  const [activeId, setActiveId] = useState(defaultId);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openH = isMobile ? OPEN_MOB : OPEN;
  const SECTION_H = openH + (TOTAL - 1) * CLOSED;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Serif+Display&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div
        style={{ padding: "30px 0px" }}
      >
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
            height: isMobile ? "auto" : SECTION_H,
            overflow: isMobile ? "visible" : "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {services.map((svc) => {
            const active = activeId === svc.id;
            const rowH = active ? openH : CLOSED;

            return (
              <motion.div
                key={svc.id}
                animate={{ height: rowH }}
                transition={{ duration: 0.42, ease }}
                onMouseEnter={() => setActiveId(svc.id)}
                onClick={() => setActiveId(svc.id)}
                style={{
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "pointer",
                  padding: "0px 40px",
                  background: active ? "#0d0d0d" : "transparent",
                  color: active ? "#fff" : "#111",
                  borderRadius: active ? 0 : 0,
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
                    padding: "0 0px",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
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
                  className="flex flex-center gap-0"
                  style={{
                    // display: "flex",
                    // alignItems: "flex-start",
                    // gap: 28,
                    // padding: "0 20px 24px 20px",
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
                  </div>

                  {/* Main Layout */}
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div
                      style={{
                        width: isMobile ? "100%" : undefined,
                        maxWidth: isMobile ? 280 : undefined,
                        margin: isMobile ? "0 auto" : undefined,
                        flexShrink: 0,
                      }}
                      className="lg:w-[350px] xl:w-[380px]"
                    >
                      <img
                        src={svc?.image}
                        alt={svc?.title}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:flex-[1.5] px-6">
                      {/* Description */}
                      <div className="pb-6 md:pb-6">
                        <p className="text-base md:text-lg font-normal font-inter leading-relaxed opacity-70">
                          {svc?.description}
                        </p>
                      </div>

                      {/* Sub Services */}
                      <div className="flex flex-col">
                        {svc?.subServices.map((sub, idx) => (
                          <motion.a
                            key={idx}
                            initial={{ x: -20, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            href={sub.url}
                            className={`flex justify-between items-center gap-2 py-4 md:py-3 border-b border-white/20 group hover:border-white/40 transition-colors ${idx === svc.subServices.length - 1 ? "pb-10" : ""}`}
                          >
                            <span className="text-lg md:text-xl lg:text-[20px] font-medium font-manrope">
                              {sub.name}
                            </span>
                            <ArrowUpRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-all flex-shrink-0" />
                          </motion.a>
                        ))}

                        {/* Mobile Button */}
                        <motion.a
                          href={svc?.url}
                          className="block md:hidden mt-8 bg-white text-black hover:bg-black border hover:border-white hover:text-white transition-colors px-8 py-4 rounded-full text-[16px] md:text-base font-inter font-semibold uppercase tracking-widest text-center"
                        >
                          Learn More
                        </motion.a>
                      </div>
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
