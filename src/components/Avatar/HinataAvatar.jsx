import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import * as THREE from "three";

const HinataAvatar = ({ position = [0, -1, 0], scale = 1, onLoad }) => {
  const avatarRef = useRef();
  const [vrm, setVrm] = useState(null);
  const [mixer, setMixer] = useState(null);
  const [animations, setAnimations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });

    loader.load(
      "/assets/vrm/hinata.vrm",
      (gltf) => {
        try {
          const vrmInstance = gltf.userData.vrm;
          VRMUtils.removeUnnecessaryJoints(vrmInstance.scene);
          VRMUtils.rotateVRM0(vrmInstance);

          // Set up the VRM
          vrmInstance.scene.traverse((obj) => {
            obj.frustumCulled = false;
          });

          setVrm(vrmInstance);
          setIsLoading(false);

          // Load idle animations if available
          const animationLoader = new GLTFLoader();
          animationLoader.load(
            "/assets/animations/idle.glb",
            (animGltf) => {
              const animMixer = new THREE.AnimationMixer(vrmInstance.scene);
              const clips = animGltf.animations;
              setMixer(animMixer);
              setAnimations(clips);

              // Play idle animation
              if (clips.length > 0) {
                const idleAction = animMixer.clipAction(clips[0]);
                idleAction.play();
              }
            },
            undefined,
            (animError) => {
              console.warn("No idle animation found, using default pose");
            }
          );

          if (onLoad) onLoad(vrmInstance);
        } catch (err) {
          console.error("Error setting up VRM:", err);
          setError(err);
          setIsLoading(false);
        }
      },
      (progress) => {
        console.log(
          "Loading VRM:",
          (progress.loaded / progress.total) * 100 + "%"
        );
      },
      (error) => {
        console.error("Error loading VRM:", error);
        setError(error);
        setIsLoading(false);
      }
    );
  }, [onLoad]);

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }

    // Subtle breathing animation
    if (avatarRef.current) {
      avatarRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
    }
  });

  if (isLoading) {
    return (
      <group ref={avatarRef} position={position} scale={scale}>
        {/* Loading placeholder */}
        <mesh>
          <boxGeometry args={[0.5, 1.5, 0.3]} />
          <meshStandardMaterial color="#ffb3ba" />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#ffb3ba" />
        </mesh>
      </group>
    );
  }

  if (error) {
    return (
      <group ref={avatarRef} position={position} scale={scale}>
        {/* Error placeholder */}
        <mesh>
          <boxGeometry args={[0.5, 1.5, 0.3]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={avatarRef} position={position} scale={scale}>
      {vrm && <primitive object={vrm.scene} />}
    </group>
  );
};

export default HinataAvatar;
