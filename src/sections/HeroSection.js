import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HinataAvatar from "../components/Avatar/HinataAvatar";
import HinataDialogue from "../components/Avatar/HinataDialogue";
import { playGesture } from "../components/Avatar/HinataAnimations";

const HeroSection = ({ onSectionChange }) => {
  const [dialogueText, setDialogueText] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [vrmInstance, setVrmInstance] = useState(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  const handleAvatarClick = () => {
    setDialogueText(
      "Hi... I'm Hinata. Zayn's personal assistant. Would you like to explore his portfolio?"
    );
    setShowDialogue(true);

    if (vrmInstance) {
      playGesture(vrmInstance, "nod", () => {
        setTimeout(() => setShowDialogue(false), 4000);
      });
    }
  };

  const handleAvatarLoaded = (vrm) => {
    setVrmInstance(vrm);
  };

  const handleSeeWork = () => {
    onSectionChange("projects");
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              Hi, I'm Zayn, a developer with a passion for code. Hinata will
              guide you through my portfolio.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
              onClick={handleSeeWork}
            />
          </div>
        </header>

        {/* RIGHT: Avatar */}
        <figure>
          <div className="hero-3d-layout">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <OrbitControls enablePan={false} enableZoom={false} />

              <group onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
                <HinataAvatar onLoaded={handleAvatarLoaded} />
              </group>

              <HinataDialogue
                text={dialogueText}
                position={[0, 1.5, 0]}
                isVisible={showDialogue}
                onClose={() => setShowDialogue(false)}
              />
            </Canvas>
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default HeroSection;
