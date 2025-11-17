import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import ContactExperience from "../components/models/contact/ContactExperience";
import Particles from "../components/models/hero_models/Particles";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      message: "",
    });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, simulate success
      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        message: "Thank you for your message! I'll get back to you soon.",
      });

      // Trigger Hinata success message
      if (window.hinataDialogue && window.hinataDialogue.showMessage) {
        window.hinataDialogue.showMessage("formSuccess");
      }

      // Reset form
      setFormData({ name: "", email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: false,
          message: "",
        });
      }, 5000);
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Contact Form */}
          <div className="flex-1 contact-content">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white-50 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black-100 text-white rounded-lg border transition-colors ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-purple-500"
                  } focus:outline-none`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-white-50 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-black-100 text-white rounded-lg border transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-purple-500"
                  } focus:outline-none`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white-50 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 bg-black-100 text-white rounded-lg border transition-colors resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-purple-500"
                  } focus:outline-none`}
                  placeholder="Your message here..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={formStatus.isSubmitting}
                className={`w-full py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
                  formStatus.isSubmitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                }`}
              >
                {formStatus.isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {formStatus.isSuccess && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg">
                  <p className="text-green-400 text-sm">{formStatus.message}</p>
                </div>
              )}

              {formStatus.isError && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
                  <p className="text-red-400 text-sm">{formStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* 3D Computer Model */}
          <div className="lg:w-1/3 flex flex-col items-center space-y-6">
            <div className="w-full h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ContactExperience />
              </Canvas>
            </div>
            <div className="text-center text-sm text-gray-400">
              Interactive 3D Contact Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
