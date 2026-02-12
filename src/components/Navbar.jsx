import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate Logo
      tl.from(logoRef.current, {
        x: -70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

        // Animate Links
        .from(
          linksRef.current.children,
          {
            y: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.5", // overlap with previous animation
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 ref={logoRef} className="text-2xl font-bold">
          Alamin
        </h1>

        {/* Links */}
        <div ref={linksRef} className="flex gap-6 font-semibold">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Service</a>
          <a href="/">Contact</a>
        </div>
      </div>
    </nav>
  );
}
