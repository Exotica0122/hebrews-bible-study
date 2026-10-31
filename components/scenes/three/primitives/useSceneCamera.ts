import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera, type Camera } from "three";

export function setLens(camera: Camera, fov: number, far: number) {
  if (!(camera instanceof PerspectiveCamera)) return;
  camera.fov = fov;
  camera.far = far;
  camera.updateProjectionMatrix();
}

/** Restore the default camera pose whenever a scene unmounts so a swapped scene starts clean. */
export function useResetCameraOnUnmount() {
  const camera = useThree((s) => s.camera);
  useEffect(
    () => () => {
      camera.position.set(0, 0, 8);
      camera.rotation.set(0, 0, 0);
      if (camera instanceof PerspectiveCamera) {
        camera.fov = 40;
        camera.updateProjectionMatrix();
      }
    },
    [camera],
  );
}
