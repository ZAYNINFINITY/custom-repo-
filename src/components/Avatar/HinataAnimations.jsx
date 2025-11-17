import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const useHinataAnimations = (vrm, mixer) => {
  useFrame((state) => {
    if (!vrm || !vrm.humanoid) return;

    const time = state.clock.elapsedTime;

    // Try different bone names for head
    let head = vrm.humanoid.getNormalizedBoneNode("head");
    if (!head) {
      head = vrm.humanoid.getNormalizedBoneNode("neck"); // Try neck if head not found
    }
    if (!head) {
      head = vrm.humanoid.getNormalizedBoneNode("spine"); // Try spine if neck not found
    }

    if (head) {
      // Subtle head tilt
      head.rotation.z = Math.sin(time * 0.3) * 0.05;
    }

    // Try different eye bone names
    let leftEye = vrm.humanoid.getNormalizedBoneNode("leftEye");
    let rightEye = vrm.humanoid.getNormalizedBoneNode("rightEye");

    if (!leftEye) {
      leftEye = vrm.humanoid.getNormalizedBoneNode("eye.L");
    }
    if (!rightEye) {
      rightEye = vrm.humanoid.getNormalizedBoneNode("eye.R");
    }

    if (leftEye && rightEye) {
      const blinkValue = Math.sin(time * 1.5) > 0.98 ? 0.2 : 0; // Natural blinking
      leftEye.scale.y = 1 - blinkValue;
      rightEye.scale.y = 1 - blinkValue;
    }

    // Try different arm bone names
    let leftArm = vrm.humanoid.getNormalizedBoneNode("leftUpperArm");
    let rightArm = vrm.humanoid.getNormalizedBoneNode("rightUpperArm");

    if (!leftArm) {
      leftArm = vrm.humanoid.getNormalizedBoneNode("arm.L");
    }
    if (!rightArm) {
      rightArm = vrm.humanoid.getNormalizedBoneNode("arm.R");
    }

    // Force a relaxed pose by setting arm rotations to natural positions
    // This should override any T-pose from the VRM model
    if (leftArm && rightArm) {
      // First set the base relaxed pose
      leftArm.rotation.x = -0.5; // Arms hanging down naturally
      rightArm.rotation.x = -0.5; // Arms hanging down naturally
      leftArm.rotation.z = 0.02; // Very slight outward
      rightArm.rotation.z = -0.02; // Very slight outward

      // Then add subtle animation on top
      const gestureValue = Math.sin(time * 0.2) * 0.05; // Very subtle movement
      leftArm.rotation.z += gestureValue;
      rightArm.rotation.z -= gestureValue;

      // console.log("Setting relaxed arm pose with animation");
    } else {
      console.log("Arm bones not found");
    }

    // Also try to set hand positions
    const leftHand = vrm.humanoid.getNormalizedBoneNode("leftHand");
    const rightHand = vrm.humanoid.getNormalizedBoneNode("rightHand");

    if (!leftHand) {
      leftHand = vrm.humanoid.getNormalizedBoneNode("hand.L");
    }
    if (!rightHand) {
      rightHand = vrm.humanoid.getNormalizedBoneNode("hand.R");
    }

    if (leftHand && rightHand) {
      // Relaxed hand positions
      leftHand.rotation.x = 0.1;
      rightHand.rotation.x = 0.1;
      // console.log("Setting relaxed hand pose");
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
