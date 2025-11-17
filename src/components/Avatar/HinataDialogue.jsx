import React, { useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";

const HinataDialogue = ({ position = [0, 1.5, 0], onOptionSelect }) => {
  const [currentMessage, setCurrentMessage] = useState(
    "Hi... I'm Hinata. I'll guide you through this portfolio."
  );
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const speechSynthesisRef = useRef(null);

  const messages = {
    greeting: "Hi... I'm Hinata. I'll guide you through this portfolio.",
    about: "This section is about Zayn's background and experience.",
    projects: "Here are some of Zayn's featured projects.",
    skills: "These are the technologies Zayn works with.",
    contact: "Feel free to reach out to Zayn here.",
    formSuccess: "Thank you for your message! Zayn will get back to you soon.",
    formError: "Oops, something went wrong. Please try again.",
  };

  const options = [
    { label: "About Me", action: "about" },
    { label: "Projects", action: "projects" },
    { label: "Skills", action: "skills" },
    { label: "Contact", action: "contact" },
  ];

  // Check if speech synthesis is supported
  useEffect(() => {
    if ("speechSynthesis" in window) {
      speechSynthesisRef.current = window.speechSynthesis;
      setVoiceEnabled(true);
    }
  }, []);

  const speakMessage = (text) => {
    if (speechSynthesisRef.current && voiceEnabled) {
      // Cancel any ongoing speech
      speechSynthesisRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1.2; // Slightly higher pitch for Hinata's character
      utterance.volume = 0.7;

      // Try to find a female voice
      const voices = speechSynthesisRef.current.getVoices();
      const femaleVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("female") ||
          voice.name.toLowerCase().includes("woman") ||
          voice.name.toLowerCase().includes("girl") ||
          voice.name.toLowerCase().includes("zira") ||
          voice.name.toLowerCase().includes("hazel")
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      speechSynthesisRef.current.speak(utterance);
    }
  };

  const typeMessage = (message) => {
    setIsTyping(true);
    setCurrentMessage("");
    let i = 0;
    const timer = setInterval(() => {
      setCurrentMessage(message.slice(0, i + 1));
      i++;
      if (i >= message.length) {
        clearInterval(timer);
        setIsTyping(false);
        speakMessage(message);
        setTimeout(() => setShowOptions(true), 1000);
      }
    }, 50);
  };

  useEffect(() => {
    typeMessage(messages.greeting);
  }, []);

  const handleOptionClick = (action) => {
    setShowOptions(false);
    typeMessage(messages[action]);
    if (onOptionSelect) {
      onOptionSelect(action);
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      speakMessage("Voice enabled!");
    }
  };

  // Expose methods for external control (like form success/error)
  useEffect(() => {
    if (window.hinataDialogue) {
      window.hinataDialogue.showMessage = (messageKey) => {
        if (messages[messageKey]) {
          setShowOptions(false);
          typeMessage(messages[messageKey]);
        }
      };
    } else {
      window.hinataDialogue = { showMessage: () => {} };
    }
  }, []);

  return (
    <Html position={position} center>
      <div className="hinata-dialogue">
        <div className="speech-bubble">
          <div className="flex justify-between items-start mb-2">
            <p className="flex-1">
              {currentMessage}
              {isTyping && "|"}
            </p>
            {voiceEnabled && (
              <button
                onClick={toggleVoice}
                className="ml-2 text-xs bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded transition-colors"
                title={voiceEnabled ? "Disable voice" : "Enable voice"}
              >
                🔊
              </button>
            )}
          </div>
          {showOptions && (
            <div className="options">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleOptionClick(option.action)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="speech-tail"></div>
      </div>
    </Html>
  );
};

export default HinataDialogue;
