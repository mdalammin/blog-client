import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoAnimation() {
  const scrollTrackRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoElRef = useRef(null);

  const [showPlay, setShowPlay] = useState(true);

  const handlePlay = (e) => {
    e.stopPropagation();
    const video = videoElRef.current;
    if (!video) return;
    video.muted = false;
    setShowPlay(false);
  };

  const handleVideoClick = () => {
    const video = videoElRef.current;
    if (!video) return;
    video.muted = true;
    setShowPlay(true);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoWrapRef.current,
        { scale: 0.55, borderRadius: "24px" },
        {
          scale: 1,
          borderRadius: "0px",
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-800">Scroll Down</h1>
      </section>

      <div ref={scrollTrackRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center bg-white overflow-hidden">
          <div
            ref={videoWrapRef}
            onClick={handleVideoClick}
            className="relative w-full h-full bg-transparent overflow-hidden cursor-pointer"
            style={{ willChange: "transform, border-radius" }}
          >
            {/* Video with audio — Big Buck Bunny has clear audio */}
            <video
              ref={videoElRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>

            {/* Overlay — dims video when play button is showing */}
            <div
              className="absolute inset-0 bg-black transition-opacity duration-500"
              style={{ opacity: showPlay ? 0.1 : 0, pointerEvents: "none" }}
            />

            {/* Play button — truly centered with flexbox on a full-size absolute div */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ pointerEvents: showPlay ? "auto" : "none" }}
            >
              <button
                onClick={handlePlay}
                aria-label="Play with sound"
                className="flex items-center justify-center cursor-pointer rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/35 hover:scale-110 active:scale-95"
                style={{
                  width: 80,
                  height: 80,
                  opacity: showPlay ? 1 : 0,
                  transform: showPlay ? "scale(1)" : "scale(0.7)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  pointerEvents: showPlay ? "auto" : "none",
                }}
              >
                <Play size={32} fill="white" strokeWidth={0} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-800">Next Section</h1>
      </section>
    </>
  );
}
