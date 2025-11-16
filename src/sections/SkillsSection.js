import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import HinataAvatar from "../components/Avatar/HinataAvatar";
import HinataDialogue from "../components/Avatar/HinataDialogue";
import { playGesture } from "../components/Avatar/HinataAnimations";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const [dialogueText, setDialogueText] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [vrmInstance, setVrmInstance] = useState(null);
  const sectionRef = useRef(null);

  const skills = [
    { name: "JavaScript", level: 90, color: "#F7DF1E" },
    { name: "React", level: 85, color: "#61DAFB" },
    { name: "Three.js", level: 80, color: "#049EF4" },
    { name: "Node.js", level: 75, color: "#339933" },
    { name: "Python", level: 70, color: "#3776AB" },
    { name: "Tailwind CSS", level: 85, color: "#06B6D4" },
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".skill-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleAvatarClick = () => {
    setDialogueText("These are Zayn's skills. I'm quite proud of them...");
    setShowDialogue(true);

    if (vrmInstance) {
      playGesture(vrmInstance, "headTilt", () => {
        setTimeout(() => setShowDialogue(false), 3000);
      });
    }
  };

  const handleAvatarLoaded = (vrm) => {
    setVrmInstance(vrm);
  };

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden">
      <div className="w-full h-full md:px-20 px-5 py-20">
        <TitleHeader title="Skills" sub="💻 My Technical Abilities" />

        <div className="flex flex-col lg:flex-row items-center gap-10 mt-16">
          {/* Skills Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-item bg-white-10 p-6 rounded-lg hover:bg-white-20 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-sm text-white-50">{skill.level}%</span>
                </div>
                <div className="w-full bg-white-20 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Avatar */}
          <div className="relative">
            <div
              className="w-64 h-64 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <HinataAvatar onLoaded={handleAvatarLoaded} />
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

export default SkillsSection;
