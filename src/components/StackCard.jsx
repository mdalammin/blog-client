const StackCard = ({ title, focused = false, className = "" }) => {
    return (
        <div
            className={`
                absolute left-1/2 -translate-x-1/2
                w-full h-full md:h-[480px]
                rounded-[32px]
                p-10
                flex flex-col md:flex-row gap-10
                transition-all duration-300
                ${className}
            `}
        >
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between text-black">
                <div className="space-y-6">
                    <span className="text-lg font-medium">
                        {title}
                    </span>

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

                <div className="flex gap-16">
                    <div>
                        <div className="text-4xl font-semibold">128%</div>
                        <div className="text-black/60">
                            Traffic Increase
                        </div>
                    </div>

                    <div>
                        <div className="text-4xl font-semibold">20.8M</div>
                        <div className="text-black/60">
                            Current Impressions
                        </div>
                    </div>
                </div>

                {focused && (
                    <button className="mt-8 w-fit bg-black text-white px-6 py-3 rounded-full text-sm font-medium">
                        View Details →
                    </button>
                )}
            </div>

            {/* Right Image */}
            <div className="w-[420px] h-full rounded-2xl overflow-hidden shadow-lg bg-white">
                <img
                    src="/assets/newversion/case-studies/image.webp"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};
export default StackCard;