import React from "react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and MongoDB.",
      image: "/images/project1.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates.",
      image: "/images/project2.png",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts.",
      image: "/images/project3.png",
      technologies: ["React", "OpenWeather API", "Chart.js"],
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Projects Grid */}
          <div className="flex-1 projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card bg-black-100 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white-50 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-purple-500 text-white px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Avatar placeholder */}
          <div className="lg:w-1/3 flex justify-center items-start">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl">💻</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
