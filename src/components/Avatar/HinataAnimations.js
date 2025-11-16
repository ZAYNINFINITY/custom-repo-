import * as THREE from "three";

export const createGestureAnimation = (vrm, gestureType) => {
  const mixer = new THREE.AnimationMixer(vrm.scene);
  let clip;

  switch (gestureType) {
    case "headTilt":
      clip = new THREE.AnimationClip("headTilt", 1, [
        new THREE.KeyframeTrack(
          ".bones.Head.rotation",
          [0, 0.5, 1],
          [0, 0, 0, 0, 0, 0.3, 0, 0, 0]
        ),
      ]);
      break;

    case "nod":
      clip = new THREE.AnimationClip("nod", 1, [
        new THREE.KeyframeTrack(
          ".bones.Head.rotation",
          [0, 0.25, 0.5, 0.75, 1],
          [0, 0, 0, 0.2, 0, 0, 0, 0, 0, 0.2, 0, 0, 0, 0, 0]
        ),
      ]);
      break;

    case "point":
      clip = new THREE.AnimationClip("point", 1.5, [
        new THREE.KeyframeTrack(
          ".bones.RightArm.rotation",
          [0, 0.5, 1, 1.5],
          [0, 0, 0, -0.5, 0, 0, -0.5, 0, -0.5, 0, 0, 0]
        ),
        new THREE.KeyframeTrack(
          ".bones.RightForeArm.rotation",
          [0, 0.5, 1, 1.5],
          [0, 0, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 0]
        ),
      ]);
      break;

    case "wave":
      clip = new THREE.AnimationClip("wave", 2, [
        new THREE.KeyframeTrack(
          ".bones.RightArm.rotation",
          [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
          [
            0, 0, 0, -0.3, 0, 0, -0.3, 0, -0.2, -0.3, 0, 0, -0.3, 0, -0.2, -0.3,
            0, 0, -0.3, 0, -0.2, -0.3, 0, 0, 0, 0, 0,
          ]
        ),
      ]);
      break;

    default:
      return null;
  }

  const action = mixer.clipAction(clip);
  action.setLoop(THREE.LoopOnce);
  action.clampWhenFinished = true;

  return { mixer, action };
};

export const playGesture = (vrm, gestureType, onComplete) => {
  const { mixer, action } = createGestureAnimation(vrm, gestureType);

  if (action) {
    action.play();
    action.getMixer().addEventListener("finished", () => {
      if (onComplete) onComplete();
    });
  }

  return { mixer, action };
};
