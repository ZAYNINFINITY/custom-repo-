import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import Particles from "../components/models/hero_models/Particles";
import { techStackIcons } from "../constants";

const SkillsSection = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = [
    {
      name: "JavaScript",
      level: 90,
      icon: "🟨",
      description:
        "Modern ES6+ development with async/await, promises, and advanced features",
      projects: "15+ projects including interactive web apps and APIs",
    },
    {
      name: "React",
      level: 85,
      icon: "⚛️",
      description:
        "Component-based development with hooks, context, and performance optimization",
      projects: "10+ React applications with complex state management",
    },
    {
      name: "Node.js",
      level: 80,
      icon: "🟢",
      description:
        "Server-side JavaScript with Express, REST APIs, and microservices",
      projects: "8+ backend services and API integrations",
    },
    {
      name: "Python",
      level: 75,
      icon: "🐍",
      description:
        "Data processing, automation scripts, and machine learning applications",
      projects: "5+ Python applications including data analysis tools",
    },
    {
      name: "Three.js",
      level: 70,
      icon: "🎲",
      description:
        "3D web graphics, interactive experiences, and WebGL applications",
      projects: "3D portfolio, interactive visualizations, and VR experiences",
    },
    {
      name: "MongoDB",
      level: 75,
      icon: "🍃",
      description:
        "NoSQL database design, aggregation pipelines, and data modeling",
      projects: "Multiple database-driven applications and APIs",
    },
    {
      name: "CSS/SCSS",
      level: 85,
      icon: "🎨",
      description: "Responsive design, animations, and modern CSS architecture",
      projects: "Pixel-perfect implementations across 20+ projects",
    },
    {
      name: "Git",
      level: 80,
      icon: "📚",
      description:
        "Version control, branching strategies, and collaborative development",
      projects: "Active contributor to open-source and team projects",
    },
    {
      name: "Docker",
      level: 65,
      icon: "🐳",
      description: "Containerization, deployment, and DevOps practices",
      projects: "Containerized applications and CI/CD pipelines",
    },
  ];

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const closeSkillDetail = () => {
    setSelectedSkill(null);
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          Skills & Technologies
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Skills Grid */}
          <div className="flex-1 skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card bg-black-100 rounded-lg p-6 hover:bg-black-200 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl"
                onClick={() => handleSkillClick(skill)}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{skill.icon}</span>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-white-50 text-sm">{skill.level}%</span>
              </div>
            ))}
          </div>

          {/* 3D Tech Icons Display */}
          <div className="lg:w-1/3 flex flex-col items-center space-y-6">
            <div className="w-full h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <TechIconCardExperience model={techStackIcons[0]} />
              </Canvas>
            </div>
            <div className="text-center text-sm text-gray-600">
              Interactive 3D Technology Stack
            </div>
          </div>
        </div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedSkill.icon} {selectedSkill.name}
                </h3>
                <button
                  onClick={closeSkillDetail}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${selectedSkill.level}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 text-sm mt-1 block">
                  Proficiency: {selectedSkill.level}%
                </span>
              </div>

              <p className="text-gray-700 mb-4">{selectedSkill.description}</p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Experience</h4>
                <p className="text-gray-600 text-sm">
                  {selectedSkill.projects}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
