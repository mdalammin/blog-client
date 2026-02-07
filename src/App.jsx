import React from 'react';
import './App.css';
import Hero from './components/Hero';
import RevenueEngine from './components/RevenueEngine';
import ServicesAccordion from './components/ServicesAccordion';
import CaseStudies from './components/CaseStudies';
import FooterUpdate from './components/FooterUpdate';
import CaseStudies2 from './components/CaseStudies2';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />

      <RevenueEngine />

      {/* <ServicesAccordion /> */}

      <CaseStudies />

      <CaseStudies2 />

      <FooterUpdate />
    </div>
  );
}

export default App;