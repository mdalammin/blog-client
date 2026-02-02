import React from 'react';
import { Mail, ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import bdflag from "../assets/newversion/footer-map/bdflag.svg";
import usaflag from "../assets/newversion/footer-map/usaflag.svg";
import ukflag from "../assets/newversion/footer-map/ukflag.svg";
import leadspider from "../assets/newversion/software/leadspider.svg";
import ProKPI from "../assets/newversion/software/ProKPI .svg";
import Taskfino from "../assets/newversion/software/Taskfino.svg";

const FooterUpdate = () => {
    return (
        <footer className="w-full bg-black text-white flex justify-center relative overflow-hidden">
            <div
                className="w-full max-w-[1440px] flex flex-col items-center pt-20 px-4 md:px-16 pb-0 gap-14 bg-black relative"
            >
                {/* Blue Blur Effect */}
                <div
                    className="absolute w-full rounded-[50%] bg-[#1147bb] opacity-90 blur-[400px]"
                    style={{
                        height: '792px',
                        top: '-732px',
                        margin: '0 !important',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                ></div>

                {/* Top Section */}
                <div className="w-full z-10">

                    <div className='flex flex-col lg:flex-row justify-between gap-10 lg:gap-28'>

                        {/* Brand Column */}
                        <div className="flex flex-col gap-8 flex-1">
                            <a href="/" className="inline-block">
                                <span className="text-4xl md:text-[40px] font-bold tracking-tight text-[#4285F4]">VISER</span>
                                <span className="text-4xl md:text-[40px] font-bold tracking-tight text-white ml-1">X</span>
                            </a>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[400px]">
                                Empower digital presence and achieve business goals with VISER X Digital Marketing and Software Development solutions.
                            </p>
                            <div className="flex flex-col gap-6 mt-2">
                                <a href="mailto:contact@viserx.com" className="flex items-center gap-3 text-lg text-gray-300 hover:text-white transition-colors">
                                    <Mail className="w-5 h-5" />
                                    <span>contact@viserx.com</span>
                                </a>

                                <button className="flex items-center gap-2 bg-transparent text-white text-lg font-medium group w-fit">
                                    <span>Company Deck</span>
                                    <div className="w-10 h-10 rounded-full bg-[#4285F4] flex items-center justify-center group-hover:bg-[#3367d6] transition-colors">
                                        <ArrowDown className="w-5 h-5 text-white" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Desktop Services/Products Layout */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 flex-[2]">
                            {/* Services Column */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-medium text-white mb-2">Services</h3>
                                <div className="flex flex-col gap-4 text-gray-400">
                                    <a href="#" className="hover:text-white transition-colors">Software</a>
                                    <a href="#" className="hover:text-white transition-colors">Website</a>
                                    <a href="#" className="hover:text-white transition-colors">SEO</a>
                                    <a href="#" className="hover:text-white transition-colors">Digital Marketing</a>
                                    <a href="#" className="hover:text-white transition-colors">Creative Content</a>
                                    <a href="#" className="hover:text-white transition-colors">Creative Design</a>
                                </div>
                            </div>

                            {/* Products Column */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-medium text-white mb-2">Our Products</h3>
                                <div className="flex flex-col gap-4 text-gray-400">
                                    <a href="#" className="hover:text-white transition-colors">TaskFino</a>
                                    <a href="#" className="hover:text-white transition-colors">ProKPI</a>
                                    <a href="#" className="hover:text-white transition-colors">XDesk</a>
                                    <a href="#" className="hover:text-white transition-colors">Winvoice</a>
                                    <a href="#" className="hover:text-white transition-colors">LandSpider</a>
                                </div>
                            </div>

                            {/* Company Column */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-medium text-white mb-2">Company</h3>
                                <div className="flex flex-col gap-4 text-gray-400">
                                    <a href="#" className="flex items-center gap-2 text-[#4285F4] hover:text-[#3367d6] transition-colors">
                                        Client Portal
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="hover:text-white transition-colors">Case Studies</a>
                                    <a href="#" className="hover:text-white transition-colors">About</a>
                                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                                    <a href="#" className="hover:text-white transition-colors">Career</a>
                                    <a href="#" className="hover:text-white transition-colors">Blogs</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Trust Badges Section */}
                <div className="hidden w-full md:flex flex-col gap-12 z-10">
                    {/* Row 1 */}
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-90">
                        <TrustBadge name="DESIGNRUSH" rating="4.8" stars={4} />
                        <TrustBadge name="Clutch" rating="4.8" stars={4} />
                        <TrustBadge name="GoodFirms" rating="4.8" stars={4} />
                        <TrustBadge name="Trustpilot" rating="4.8" stars={4} color="white" />
                        <TrustBadge name="sortlist" rating="4.8" stars={4} />
                    </div>
                </div>

                {/* Offices Section */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 z-10">
                    <OfficeLocation
                        title="Wyoming Office"
                        address="30 N Gould St STE R Sheridan, WY 82801, USA"
                        phone="+1 (307) 393-8955"
                        icon={usaflag}
                    />
                    <OfficeLocation
                        title="London Office"
                        address="115 Osborne Rd, London, E7 0PP,UK"
                        phone="+44 7429-622150"
                        icon={ukflag}
                    />
                    <OfficeLocation
                        title="Dhaka Office"
                        address="Plot 06, Road 02, Sector 11, Uttara, Dhaka-1230,BD"
                        phone="+88 018-42088100"
                        icon={bdflag}
                    />
                </div>

                {/* Bottom Bar */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center z-20 pb-4 pt-4 mt-4">
                    <span className="text-gray-500 text-sm">Proudly brought to you by Viser X</span>
                    <div className="text-gray-500 text-sm mt-2 md:mt-0">
                        ©2025 Viser X, LLC. All rights reserved
                    </div>
                </div>

                {/* Background Overlay Text */}
                <div className="absolute bottom-0 w-full flex justify-center pointer-events-none select-none overflow-hidden">
                    <h1 className="text-[17vw] leading-[0.8] font-extrabold uppercase whitespace-nowrap bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent tracking-tight">
                        VISER X
                    </h1>
                </div>
            </div>
        </footer>
    );
};

// Helper Components
const TrustBadge = ({ name, rating, stars, color = "white" }) => (
    <div className="flex flex-col items-center gap-1">
        <div className={`flex items-center gap-2 text-2xl font-bold ${color === 'green' ? 'text-green-500' : 'text-white'}`}>
            {/* Simple Icon Placeholder */}
            {color === 'green' && <span className="text-green-500">★</span>}
            {name === 'DESIGNRUSH' && <span className="text-blue-400">❖</span>}
            <span>{name}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-white">
            <span>{rating}</span>
            <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < Math.floor(stars) ? 'text-orange-500' : 'text-gray-600'}`}>★</span>
                ))}
                {stars % 1 !== 0 && <span className="text-xs text-orange-500" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}>★</span>}
            </div>
        </div>
    </div>
);

const OfficeLocation = ({ title, address, phone, icon }) => (
    <div className="flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center text-white mb-1">
            {/* Map outline placeholder */}
            {/* <img
                src={icon}
                alt='usa'
                width={40}
                height={40}
            /> */}
        </div>
        <h4 className="text-white text-lg font-medium">{title}</h4>
        <p className="text-gray-400 text-sm max-w-[250px]">{address}</p>
        <p className="text-white text-base font-semibold">{phone}</p>
    </div>
);

export default FooterUpdate;
