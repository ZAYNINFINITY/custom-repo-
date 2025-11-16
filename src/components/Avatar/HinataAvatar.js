import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import * as THREE from "three";

const HinataAvatar = ({ onLoaded, onGesture }) => {
  const { scene } = useThree();
  const vrmRef = useRef();
  const [vrm, setVrm] = useState(null);
  const [mixer, setMixer] = useState(null);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    const loader = new THREE.GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      "/assets/vrm/hinata.vrm",
      (gltf) => {
        const vrmInstance = gltf.userData.vrm;
        VRMUtils.removeUnnecessaryJoints(vrmInstance.scene);
        VRMUtils.rotateVRM0(vrmInstance);

        // Position the avatar
        vrmInstance.scene.position.set(0, -1.5, 0);
        vrmInstance.scene.scale.set(0.8, 0.8, 0.8);

        scene.add(vrmInstance.scene);
        vrmRef.current = vrmInstance;
        setVrm(vrmInstance);

        // Setup idle animations
        setupIdleAnimations(vrmInstance);

        if (onLoaded) onLoaded(vrmInstance);
      },
      (progress) => console.log("Loading progress:", progress),
      (error) => console.error("Error loading VRM:", error)
    );

    return () => {
      if (vrmRef.current) {
        scene.remove(vrmRef.current.scene);
      }
    };
  }, [scene, onLoaded]);

  const setupIdleAnimations = (vrmInstance) => {
    const mixerInstance = new THREE.AnimationMixer(vrmInstance.scene);
    setMixer(mixerInstance);

    // Breathing animation
    const breathingClip = new THREE.AnimationClip("breathing", 2, [
      new THREE.KeyframeTrack(
        ".bones.Hips.position",
        [0, 1, 2],
        [0, 0, 0, 0, 0.01, 0, 0, 0, 0]
      ),
    ]);

    // Blinking animation
    const blinkingClip = new THREE.AnimationClip("blinking", 3, [
      new THREE.KeyframeTrack(
        ".morphTargetInfluences",
        [0, 0.1, 0.2, 2.9, 3],
        [0, 0, 1, 1, 0]
      ),
    ]);

    const breathingAction = mixerInstance.clipAction(breathingClip);
    const blinkingAction = mixerInstance.clipAction(blinkingClip);

    breathingAction.play();
    blinkingAction.play();

    setAnimations([breathingAction, blinkingAction]);
  };

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }

    // Subtle head movement
    if (vrm && vrm.humanoid) {
      const head = vrm.humanoid.getNormalizedBoneNode("head");
      if (head) {
        head.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        head.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      }
    }
  });

  return null;
};

export default HinataAvatar;
