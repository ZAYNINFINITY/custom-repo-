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

const ProjectsSection = ({ onSectionChange }) => {
  const [dialogueText, setDialogueText] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [vrmInstance, setVrmInstance] = useState(null);

  const projects = [
    {
      title: "Ryde App",
      description: "An on-demand rides app built with React Native and Expo.",
      image: "/images/project1.png",
    },
    {
      title: "Library Management",
      description: "A comprehensive library management platform.",
      image: "/images/project2.png",
    },
    {
      title: "YC Directory",
      description: "A startup showcase app for Y Combinator companies.",
      image: "/images/project3.png",
    },
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      }
    );
  });

  const handleAvatarClick = () => {
    setDialogueText(
      "Here are Zayn's amazing projects. Each one showcases his skills and creativity..."
    );
    setShowDialogue(true);

    if (vrmInstance) {
      playGesture(vrmInstance, "wave", () => {
        setTimeout(() => setShowDialogue(false), 4000);
      });
    }
  };

  const handleAvatarLoaded = (vrm) => {
    setVrmInstance(vrm);
  };

  return (
    <section id="projects" className="py-20">
      <div className="w-full h-full md:px-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Projects Grid */}
          <div className="flex-1 projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card bg-white-10 p-6 rounded-lg hover:bg-white-20 transition-colors"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-white-50">{project.description}</p>
              </div>
            ))}
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

        <div className="text-center mt-8">
          <button
            onClick={() => onSectionChange("skills")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            View My Skills
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
