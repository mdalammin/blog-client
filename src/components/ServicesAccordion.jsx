
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
    {
        id: 'software',
        title: 'Software',
        description: 'From SaaS dashboards to fintech mobile apps, we design products that scale with your users. Browse some of our recent collaborations with US and European startups',
        subServices: ['Custom Development', 'SaaS Products', 'Mobile Apps', 'Enterprise Solutions'],
        imageColor: 'bg-blue-600'
    },
    {
        id: 'seo',
        title: 'SEO',
        description: 'Craft intuitive, accessible interfaces through user research, interaction design, prototyping, and visual refinement to enhance engagement and conversion.',
        subServices: [
            'SEO Audit Service',
            'Local SEO',
            'Guest Post Services',
            'SEO Services',
            'App Store Optimization',
            'E-Commerce SEO',
            'Google Business Profile'
        ],
        imageColor: 'bg-blue-500'
    },
    {
        id: 'website',
        title: 'Website',
        description: 'High-performance websites that drive growth and engagement.',
        subServices: ['Web Design', 'Web Development', 'E-commerce', 'Landing Pages'],
        imageColor: 'bg-purple-600'
    },
    {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        description: 'Strategic marketing campaigns to boost your brand presence.',
        subServices: ['Social Media', 'PPC', 'Content Marketing', 'Email Marketing'],
        imageColor: 'bg-green-600'
    },
    {
        id: 'creative-design',
        title: 'Creative Design',
        description: 'Visual storytelling through stunning creative design.',
        subServices: ['Branding', 'UI/UX Design', 'Graphic Design', 'Motion Graphics'],
        imageColor: 'bg-orange-600'
    },
    {
        id: 'creative-content',
        title: 'Creative Content',
        description: 'Compelling content that resonates with your audience.',
        subServices: ['Copywriting', 'Video Production', 'Blog Writing', 'Social Shifts'],
        imageColor: 'bg-red-600'
    }
];

// export default function ServicesAccordion() {
//     const [activeId, setActiveId] = useState('');

//     return (
//         <div
//             className="w-full bg-white font-sans text-black"
//         >
//             <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6 px-6 pt-6 md:px-16 md:pt-4">
//                 <h3 className="text-5xl font-semibold font-['Manrope'] leading-[52px] text-black">
//                     Services
//                 </h3>
//                 <p className="max-w-md text-xl font-medium font-['Inter'] leading-6 text-black/50 text-right md:text-left">
//                     From SaaS dashboards to fintech mobile apps, we design products that scale with your users. Browse some of our recent collaborations with US and European startups
//                 </p>
//             </div>

//             <div
//                 className="flex flex-col"
//                 onMouseLeave={() => setActiveId('')}
//             >
//                 {services.map((service) => (
//                     <ServiceItem
//                         key={service.id}
//                         service={service}
//                         isActive={activeId === service.id}
//                         onHover={() => setActiveId(service.id)}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

export default function ServicesAccordion() {
    const [activeId, setActiveId] = useState(null);

    return (
        <div className="w-full bg-white font-sans text-black pt-16">
            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 px-6 md:px-16">
                <h3 className="text-5xl font-semibold font-['Manrope'] tracking-tight text-black">
                    Services
                </h3>
                <p className="max-w-md text-xl font-medium font-['Inter'] leading-relaxed text-black/50">
                    From SaaS dashboards to fintech mobile apps, we design products that scale with your users.
                </p>
            </div>

            {/* LayoutGroup ensures siblings animate smoothly when one expands */}
            <LayoutGroup>
                <div
                    className="flex flex-col border-t border-gray-100 cursor-pointer"
                    onMouseLeave={() => setActiveId(null)}
                >
                    {services.map((service) => (
                        <ServiceItem
                            key={service.id}
                            service={service}
                            isActive={activeId === service.id}
                            onHover={() => setActiveId(service.id)}
                        />
                    ))}
                </div>
            </LayoutGroup>
        </div>
    );
}

const ServiceItem = ({ service, isActive, onHover }) => {
    return (
        <motion.div
            layout // Keeps the container and its neighbors moving smoothly
            onMouseEnter={onHover}
            className={`relative overflow-hidden px-6 md:px-16 transition-colors duration-300 ${isActive ? 'bg-black text-white' : 'bg-transparent text-black border-b border-gray-200'
                }`}
        >
            {/* Header: Fixed the layout prop to allow it to move with the container */}
            <motion.div
                layout
                className="flex justify-between items-center py-6"
            >
                <span className="text-3xl md:text-4xl font-semibold font-['Manrope'] tracking-tight">
                    {service.title}
                </span>

                {!isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                        <ArrowUpRight className="w-6 h-6" />
                    </motion.div>
                )}
            </motion.div>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        // Key changes: Faster duration and removed delay for "snappy" feel
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                                height: { duration: 0.3, ease: "easeOut" },
                                opacity: { duration: 0.25 }
                            }
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: { duration: 0.2, ease: "easeIn" },
                                opacity: { duration: 0.1 }
                            }
                        }}
                        className="overflow-hidden"
                    >
                        <div className="pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="hidden lg:block lg:col-span-4" />
                            <div className="lg:col-span-8">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                                    <p className="text-xl font-normal font-['Inter'] leading-relaxed text-white/70 max-w-lg">
                                        {service.description}
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest shrink-0"
                                    >
                                        Grow your Business
                                    </motion.button>
                                </div>

                                <div className="flex flex-col">
                                    {service.subServices.map((sub, idx) => (
                                        <motion.a
                                            key={idx}
                                            // Reduced staggered delay for faster response
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.05 * idx }}
                                            href="#"
                                            className="flex justify-between items-center py-5 border-b border-white/10 group hover:border-white/40 transition-colors"
                                        >
                                            <span className="text-2xl font-medium font-['Manrope']">
                                                {sub}
                                            </span>
                                            <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-all" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// const SearchIconPlaceholder = ({ className }) => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
//         <circle cx="11" cy="11" r="8" />
//         <path d="M21 21l-4.35-4.35" />
//         <path d="M11 8v6" />
//         <path d="M8 11h6" />
//     </svg>
// );
