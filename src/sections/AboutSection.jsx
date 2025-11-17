import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* About Content */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-white-50 text-lg mb-4">
              I'm Zayn, a passionate developer with expertise in modern web
              technologies. I love creating interactive experiences and bringing
              ideas to life through code.
            </p>
            <p className="text-white-50 text-lg mb-4">
              With a background in both design and development, I strive to
              create beautiful, functional, and user-friendly applications. My
              journey in tech has been driven by curiosity and a desire to solve
              real-world problems through technology.
            </p>
            <p className="text-white-50 text-lg">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or enjoying a good cup of
              coffee.
            </p>
          </div>

          {/* Avatar placeholder or additional content */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-6xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
