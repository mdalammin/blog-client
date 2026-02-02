import React from "react";
import { motion } from "framer-motion";
import revenueImg from "../assets/newversion/revenuebg.png";

const RevenueEngine = () => {
    return (
        <section className="relative py-32 overflow-hidden flex items-center justify-center min-h-[600px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={revenueImg}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Turn Your Marketing Into a <br />
                        <span className="text-blue-400">Revenue Engine</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Our cross-disciplinary team combines strategy, branding, UX design, and technology for swift, impactful results.
                    </p>

                    <form className="bg-white rounded-full p-2 flex items-center gap-2 max-w-lg mx-auto shadow-2xl">
                        <input
                            type="text"
                            placeholder="Enter Your Website"
                            className="flex-1 px-6 py-3 text-gray-900 placeholder:text-gray-500 bg-transparent outline-none"
                        />
                        <button className="bg-[#4285F4] hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all whitespace-nowrap shadow-md">
                            Get Free Proposal
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default RevenueEngine;
