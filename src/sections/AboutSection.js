import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import HinataAvatar from "../components/Avatar/HinataAvatar";
import HinataDialogue from "../components/Avatar/HinataDialogue";
import { playGesture } from "../components/Avatar/HinataAnimations";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = ({ onSectionChange }) => {
  const [dialogueText, setDialogueText] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [vrmInstance, setVrmInstance] = useState(null);

  useGSAP(() => {
    gsap.fromTo(
      ".about-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
      }
    );
  });

  const handleAvatarClick = () => {
    setDialogueText(
      "This is about Zayn. He's a passionate developer who loves creating amazing things..."
    );
    setShowDialogue(true);

    if (vrmInstance) {
      playGesture(vrmInstance, "point", () => {
        setTimeout(() => setShowDialogue(false), 4000);
      });
    }
  };

  const handleAvatarLoaded = (vrm) => {
    setVrmInstance(vrm);
  };

  return (
    <section id="about" className="py-20">
      <div className="w-full h-full md:px-20 px-5">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* About Content */}
          <div className="flex-1 about-content">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-white-50 text-lg mb-4">
              I'm Zayn, a passionate developer with expertise in modern web
              technologies. I love creating interactive experiences and bringing
              ideas to life through code.
            </p>
            <p className="text-white-50 text-lg mb-6">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open source projects, or enjoying a good cup of
              coffee.
            </p>
            <button
              onClick={() => onSectionChange("projects")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              View My Projects
            </button>
          </div>

          {/* Avatar */}
          <div className="relative">
            <div
              className="w-64 h-64 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <OrbitControls enablePan={false} enableZoom={false} />

                <HinataAvatar onLoaded={handleAvatarLoaded} />
              </Canvas>
            </div>
            <HinataDialogue
              text={dialogueText}
              position={[0, 2, 0]}
              isVisible={showDialogue}
              onClose={() => setShowDialogue(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
