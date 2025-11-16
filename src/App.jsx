import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScrolling } from "./utils/scrollHelper";

import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ContactSection from "./sections/ContactSection";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Navbar from "./components/NavBar";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [currentSection, setCurrentSection] = useState("hero");

  useGSAP(() => {
    // Smooth scrolling for navigation
    gsap.utils.toArray("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target.getAttribute("href");
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: "power2.inOut",
        });
      });
    });
  });

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    const target = `#${section}`;
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 80 },
      ease: "power2.inOut",
    });
  };

  return (
    <>
      <Navbar />
      <HeroSection onSectionChange={handleSectionChange} />
      <AboutSection onSectionChange={handleSectionChange} />
      <ProjectsSection onSectionChange={handleSectionChange} />
      <SkillsSection onSectionChange={handleSectionChange} />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
      <ContactSection onSectionChange={handleSectionChange} />
      <Footer />
    </>
  );
};

export default App;
