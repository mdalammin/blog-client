import StackCard from "./StackCard";

export const CaseStudies = () => {
    return (
        <section className="max-w-7xl mx-auto py-24 px-4 my-[120px] bg-white">
            {/* Header */}
            {/* <div className="text-center space-y-6 mb-24">
                <h2 className="text-5xl font-semibold">
                    Featured Case Studies
                </h2>
                <p className="text-gray-500 text-xl">
                    Discover how we’re driving change through innovative projects,
                    strong <br /> partnerships, and measurable outcomes
                </p>
            </div> */}

            {/* Stack Container */}
            <div className="relative max-w-6xl mx-auto h-[720px]">
                {/* Card 1 (Top back) */}
                <StackCard
                    title="Technology"
                    className="bg-[#EEF3FF] translate-y-[-120px] scale-[0.92] z-10"
                />

                {/* Card 2 */}
                <StackCard
                    title="Finance"
                    className="bg-[#DCE7FF] translate-y-[-60px] scale-[0.96] z-20"
                />

                {/* Card 3 (CENTER FOCUS) */}
                <StackCard
                    title="Technology"
                    focused
                    className="bg-[#7EA2F7] translate-y-[0px] scale-100 z-30"
                />

                {/* Card 4 */}
                <StackCard
                    title="Home Decorate"
                    className="bg-[#DCE7FF] translate-y-[60px] scale-[0.96] z-20"
                />

                {/* Card 5 (Bottom back) */}
                <StackCard
                    title="Technology"
                    className="bg-[#EEF3FF] translate-y-[120px] scale-[0.92] z-10"
                />
            </div>
        </section>
    );
};
