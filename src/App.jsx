import React from "react";
import "./App.css";
import Hero from "./components/Hero";
import RevenueEngine from "./components/RevenueEngine";
import ServicesAccordion from "./components/ServicesAccordion";
import CaseStudies from "./components/CaseStudies";
import FooterUpdate from "./components/FooterUpdate";
import PathAnimation from "./components/PathAnimation";
import Navbar from "./components/Navbar";
import VideoAnimation from "./components/VideoAnimation";
import TextScrolling from "./components/TextScrolling";
import ImageSliderScroll from "./components/ImageSliderScroll";
import CodingStyleEvaluation from "./components/CoadingStyleEvalution/CodingStyleEvaluation";
import CardAnimation from "./components/CardAnimation";
import PinnedSection from "./components/PinnedSection/PinnedSection";
import ScrollAnimation from "./components/ScrollAnimation/ScrollAnimation";

function App() {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      {/* <Hero /> */}

      {/* <CardAnimation /> */}

      {/* <VideoAnimation /> */}

      {/* <RevenueEngine /> */}

      <TextScrolling />

      <ServicesAccordion />

      {/* <CodingStyleEvaluation /> */}

      {/* <ScrollAnimation /> */}

      {/* <PinnedSection /> */}

      {/* <CaseStudies /> */}

      {/* <ImageSliderScroll /> */}

      {/* <PathAnimation /> */}

      <FooterUpdate />
    </div>
  );
}

export default App;
