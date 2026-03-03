"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight, Play, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "VISER X has been a game-changer for us. Their SEO expertise helped us rank on the first page for key keywords, driving more organic traffic and boosting sales. We couldn't be happier with the results!",
    author: "Hannah Clarke",
    title: "Clarke Home Décor",
    videoUrl:
      "https://cdn.jsdelivr.net/gh/mdalammin/viserx-home-page-assets@main/videos/testimonials/hannah_clarke.webm",
  },
  {
    id: 2,
    quote:
      "Within a few months, our rankings for “Regina Divorce Lawyer” shot up, and we started getting a steady stream of quality leads. The team feels like an extension of ours and has helped us grow more than we expected. Highly recommend!",
    author: "Michael Anderson",
    title: "Regina Divorce Lawyer",
    videoUrl:
      "https://cdn.jsdelivr.net/gh/mdalammin/viserx-home-page-assets@main/videos/testimonials/lawyer.webm",
  },
  {
    id: 3,
    quote:
      "Since VISER X took over our Google Ads, patient inquiries have steadily increased. They reduced wasted spend, improved conversions, and their transparent reporting keeps us informed. Highly recommended!",
    author: "Ethan Thompson",
    title: "Thompson Cardiology Center",
    videoUrl:
      "https://cdn.jsdelivr.net/gh/mdalammin/viserx-home-page-assets@main/videos/testimonials/doctor.webm",
  },
];

const VideoCard = ({ testimonial }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSound, setHasSound] = useState(false);

  const playVideo = (withSound) => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !withSound;

    const tryPlay = () => {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          if (withSound) setHasSound(true);
        })
        .catch(() => {});
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      const onCanPlay = () => {
        tryPlay();
        video.removeEventListener("canplay", onCanPlay);
      };
      video.addEventListener("canplay", onCanPlay);
      video.load();
    }
  };

  const handleMouseEnter = () => {
    window.__VIDEO_SOUND_UNLOCKED__ = true;
    playVideo(true);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  };

  const handleClick = () => {
    window.__VIDEO_SOUND_UNLOCKED__ = true; // 🔥 unlock immediately
    playVideo(true); // 🔊 play with sound
  };

  return (
    <div className="bg-white rounded-[16px] md:rounded-[32px] p-5 sm:p-6 md:p-[32px] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] border border-white flex flex-col-reverse md:flex-row gap-6 md:gap-12 items-stretch md:min-h-[500px] w-full transition-all duration-500 hover:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.1)]">
      {/* LEFT CONTENT (UNCHANGED) */}
      <div className="flex-1 flex flex-col justify-between py-2">
        <div>
          <div className="flex gap-1 text-orange-400 mb-6 sm:mb-8">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="sm:w-5 sm:h-5"
                fill="currentColor"
                stroke="none"
              />
            ))}
          </div>

          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-[24px] font-manrope font-semibold text-gray-900 leading-[1.3] mb-8">
            “{testimonial.quote}”
          </blockquote>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900 text-lg sm:text-xl font-manrope leading-tight">
              {testimonial.author}
            </p>
            <p className="text-gray-500 text-sm sm:text-base mt-1 font-medium">
              {testimonial.title}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT VIDEO */}
      <div
        className="relative rounded-[16px] overflow-hidden w-full md:w-[340px] md:h-[440px] aspect-[4/5] md:aspect-auto bg-gray-100 group cursor-pointer shrink-0 shadow-2xl shadow-blue-500/10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          playsInline
          loop
          preload="metadata"
          poster="/thumbnails/video-thumb.jpg"
        >
          <source src={testimonial.videoUrl} type="video/webm" />
        </video>

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Play button / sound hint */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700">
              <Play size={24} className="ml-1" fill="currentColor" />
            </div>

            {/* {!hasSound && (
              <span className="text-xs text-white bg-black/60 px-2 py-1 rounded">
                Click for sound 🔊
              </span>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

const SuccessStories = () => {
  return (
    <section className="py-[64px] md:py-16 lg:py-20 xl:py-24 bg-[#FAFAFA] overflow-hidden w-full">
      <div className="max-w-[1440px] mx-auto px-4 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20">
          <h2 className="text-[32px] sm:text-[40px] md:text-5xl lg:text-6xl xl:text-7xl font-manrope font-bold text-gray-900 tracking-tight leading-tight">
            Success Stories <br className="hidden sm:block" /> That Inspire Us
          </h2>

          <div className="hidden lg:flex gap-2 sm:gap-3 mt-4">
            <button className="swiper-prev-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all text-[#000] bg-gray-300">
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button className="swiper-next-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all text-[#000] bg-gray-300">
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            speed={1000}
            grabCursor={true}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 1.5,
                spaceBetween: 40,
              },
            }}
            navigation={{
              prevEl: ".swiper-prev-btn",
              nextEl: ".swiper-next-btn",
            }}
            loop={true}
            className="!overflow-visible"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <VideoCard testimonial={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-center items-center lg:hidden gap-2 sm:gap-3 mt-8">
          <button className="swiper-prev-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all text-[#000] bg-gray-300">
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          </button>
          <button className="swiper-next-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all text-[#000] bg-gray-300">
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
