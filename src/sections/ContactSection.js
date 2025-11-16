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

const ContactSection = ({ onSectionChange }) => {
  const [dialogueText, setDialogueText] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [vrmInstance, setVrmInstance] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useGSAP(() => {
    gsap.fromTo(
      ".contact-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 80%",
        },
      }
    );
  });

  const handleAvatarClick = () => {
    setDialogueText(
      "You can contact Zayn here. I'd be happy to help you get in touch..."
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! Zayn will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20">
      <div className="w-full h-full md:px-20 px-5">
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Contact Form */}
          <div className="flex-1 contact-content">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white-10 border border-white-20 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white-10 border border-white-20 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white-10 border border-white-20 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
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

export default ContactSection;
