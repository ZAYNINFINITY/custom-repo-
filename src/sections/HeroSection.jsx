import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HinataAvatar from "../components/Avatar/HinataAvatar";
import HinataDialogue from "../components/Avatar/HinataDialogue";
import { scrollToSection } from "../utils/scrollHelper";

const HeroSection = () => {
  const [currentSection, setCurrentSection] = useState(null);

  const handleOptionSelect = (section) => {
    setCurrentSection(section);
    scrollToSection(section);
  };

  return (
    <section id="hero" className="relative overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="hero-layout">
          {/* LEFT: Hero Content */}
          <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
            <div className="flex flex-col gap-7">
              <div className="hero-text">
                <h1>
                  Hi, I'm Zayn
                  <span className="slide">
                    <span className="wrapper">
                      <span className="flex items-center md:gap-3 gap-1 pb-2">
                        <span>Full Stack Developer</span>
                      </span>
                      <span className="flex items-center md:gap-3 gap-1 pb-2">
                        <span>UI/UX Designer</span>
                      </span>
                      <span className="flex items-center md:gap-3 gap-1 pb-2">
                        <span>Creative Coder</span>
                      </span>
                    </span>
                  </span>
                </h1>
                <h1>Building Digital</h1>
                <h1>Experiences</h1>
              </div>

              <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                Welcome to my portfolio. Hinata will guide you through my work
                and journey.
              </p>

              <button
                onClick={() => handleOptionSelect("about")}
                className="md:w-80 md:h-16 w-60 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Start Exploring
              </button>
            </div>
          </header>

          {/* RIGHT: 3D Avatar with Canvas */}
          <div className="hero-3d-layout">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} />
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={false}
              />
              <HinataAvatar
                position={[0, -1, 0]}
                scale={0.8}
                onLoad={(vrm) => console.log("Hinata loaded:", vrm)}
              />
              <HinataDialogue
                position={[0, 1.5, 0]}
                onOptionSelect={handleOptionSelect}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
