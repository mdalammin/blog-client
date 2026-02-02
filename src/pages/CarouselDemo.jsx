import React from "react";
import VerticalScrollCarousel from "../components/VerticalScrollCarousel";

const CarouselDemo = () => {
  // Custom sample cards for the carousel
  const blogCards = [
    {
      icon: "📖",
      title: "Getting Started",
      description:
        "Learn the fundamentals of web development and build your first projects with our comprehensive guides.",
    },
    {
      icon: "💻",
      title: "Advanced Techniques",
      description:
        "Master advanced development patterns and best practices used by industry professionals.",
    },
    {
      icon: "🎨",
      title: "Design Systems",
      description:
        "Create scalable and maintainable design systems for modern web applications.",
    },
    {
      icon: "🔐",
      title: "Security Best Practices",
      description:
        "Protect your applications with proven security patterns and methodologies.",
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description:
        "Optimize your applications for speed and efficiency across all devices.",
    },
    {
      icon: "🌐",
      title: "Full Stack Development",
      description:
        "Build complete web applications from frontend to backend with modern technologies.",
    },
  ];

  return (
    <div className="w-full">
      <VerticalScrollCarousel cards={blogCards} />
    </div>
  );
};

export default CarouselDemo;
