import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const useHinataAnimations = (vrm, mixer) => {
  useFrame((state) => {
    if (!vrm) return;

    const time = state.clock.elapsedTime;

    // Subtle head tilt
    const head = vrm.humanoid.getNormalizedBoneNode("head");
    if (head) {
      head.rotation.z = Math.sin(time * 0.5) * 0.05;
    }

    // Blinking
    const leftEye = vrm.humanoid.getNormalizedBoneNode("leftEye");
    const rightEye = vrm.humanoid.getNormalizedBoneNode("rightEye");
    if (leftEye && rightEye) {
      const blinkValue = Math.sin(time * 2) > 0.95 ? 0.1 : 0;
      leftEye.scale.y = 1 - blinkValue;
      rightEye.scale.y = 1 - blinkValue;
    }

    // Gentle gestures (arm movements)
    const leftArm = vrm.humanoid.getNormalizedBoneNode("leftUpperArm");
    const rightArm = vrm.humanoid.getNormalizedBoneNode("rightUpperArm");
    if (leftArm && rightArm) {
      const gestureValue = Math.sin(time * 0.3) * 0.1;
      leftArm.rotation.z = gestureValue;
      rightArm.rotation.z = -gestureValue;
    }
  });
};

export const playAnimation = (mixer, animationName, animations) => {
  if (!mixer || !animations) return;

  const clip = animations.find((anim) => anim.name === animationName);
  if (clip) {
    const action = mixer.clipAction(clip);
    action.reset().play();
    return action;
  }
  return null;
};

export const stopAnimation = (action) => {
  if (action) {
    action.stop();
  }
};
