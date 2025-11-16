import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

const HinataDialogue = ({ text, position, isVisible, onClose }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isVisible && text) {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [isVisible, text]);

  useEffect(() => {
    if (isVisible && text && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50); // Typing speed

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, isVisible]);

  if (!isVisible) return null;

  return (
    <Html position={position} center>
      <div className="speech-bubble">
        <div className="speech-bubble-content">
          <p>{displayText}</p>
        </div>
        <div className="speech-bubble-arrow"></div>
      </div>
    </Html>
  );
};

export default HinataDialogue;
