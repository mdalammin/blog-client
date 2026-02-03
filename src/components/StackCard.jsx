import React, { forwardRef } from "react";

const StackCard = forwardRef(({ title, className = "", style = {} }, ref) => {
    return (
        <div
            ref={ref}
            style={style}
            className={`
                absolute left-1/2 -translate-x-1/2
                w-full h-full md:h-[480px]
                rounded-[32px]
                p-10
                flex flex-col md:flex-row gap-10
                overflow-hidden
                ${className}
            `}
        >
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between text-black">
                <div className="space-y-6">
                    <span className="card-title text-lg font-medium block">
                        {title}
                    </span>

                    <div className="card-main-content space-y-6">
                        <h3 className="text-[40px] leading-[48px] font-semibold tracking-tight">
                            Apple Gadgets Doubles Traffic
                            <br />
                            with Strategic SEO in 3 Months
                        </h3>

                        <p className="text-black/70 max-w-[520px]">
                            Apple Gadgets grew traffic from 702K to 1.6M in 3 months with
                            powerful, data-driven SEO.
                        </p>
                    </div>
                </div>

                <div className="card-footer-section flex flex-col gap-8">
                    <div className="card-metrics flex gap-16">
                        <div>
                            <div className="text-4xl font-semibold">128%</div>
                            <div className="text-black/60 text-sm">
                                Traffic Increase
                            </div>
                        </div>

                        <div>
                            <div className="text-4xl font-semibold">20.8M</div>
                            <div className="text-black/60 text-sm">
                                Current Impressions
                            </div>
                        </div>
                    </div>

                    <button className="card-button w-fit bg-black text-white px-6 py-3 rounded-full text-sm font-medium">
                        View Details →
                    </button>
                </div>
            </div>

            {/* Right Image */}
            <div className="card-image w-[420px] h-full rounded-2xl overflow-hidden shadow-lg bg-white">
                <img
                    src="/assets/newversion/case-studies/image.webp"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
});

StackCard.displayName = "StackCard";

export default StackCard;

