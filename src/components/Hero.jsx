"use client";
import React from "react";

import { MoveRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import herobg from "../assets/newversion/herobg.png";

const Hero = () => {
    return (
        <section className="relative w-full overflow-hidden flex items-center pt-28 pb-8">

            <div
                className="absolute inset-0 z-10 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${herobg.src})`,
                    maskImage:
                        'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage:
                        'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                }}>
            </div>


            {/* Full-Screen Background Video with Transparency Mask */}
            <div
                className="absolute inset-0 h-full z-0 pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 25%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 35%, black 5%, transparent)'
                }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 top-0 w-full h-full object-right"
                >
                    <source src="/videos/herovdo1.webm" type="video/webm" />
                    {/* <source src="/assets/newversion/hero-section/herovdo1.webm" type="video/webm" /> */}
                    Your browser does not support the video tag.
                </video>
                {/* Optional: Subtle Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-white/40"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full flex items-center pt-10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col justify-center">
                        {/* Rating / Badge */}
                        <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2 border border-gray-100">
                                <span className="font-bold text-gray-900">5.0</span>
                                <div className="flex gap-0.5 text-red-500">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="font-bold text-gray-900 ml-1">Clutch</span>
                            </div>
                        </div>

                        {/* Main Headline */}
                        <div className="relative mb-8 max-w-5xl">
                            <h1 className="text-5xl md:text-7xl lg:text-7xl font-medium tracking-tight text-gray-900 leading-[1.1]">
                                Empowering <br />
                                <span className="font-medium">Digital Presence</span>
                                {/* <span className="font-normal">Digital Marketing Agency</span> */}
                            </h1>
                        </div>

                        {/* Subtext */}
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
                            Make Your Business Smarter, Grow Sales & Boost up Overall Performance with Our Software Development & Digital Marketing Professionals.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <button className="bg-[#4285F4] hover:bg-teal-600 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center md:justify-start gap-2 w-full md:w-fit">
                                Get Free Assessment
                            </button>
                            <button className="bg-[#1f372a] hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center md:justify-start gap-2 w-full md:w-fit">
                                <FaWhatsapp size={20} />
                                WhatsApp
                            </button>
                        </div>
                    </div>

                    {/* Empty Right Column for Layout Balance (Video is now full background) */}
                    <div className="hidden lg:block w-full h-full">
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
