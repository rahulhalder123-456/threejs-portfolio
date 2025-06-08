import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const HeroCamera = ({ isMobile, isPortrait, children }) => {
  const group = useRef();

  useFrame((state, delta) => {
    // Adjust camera zoom for landscape on mobile
    const targetZ = isMobile
      ? isPortrait
        ? 20
        : 28  // pull back in landscape mode
      : 20;

    easing.damp3(state.camera.position, [0, 0, targetZ], 0.25, delta);

    if (!isMobile) {
      easing.dampE(group.current.rotation, [-state.pointer.y / 3, state.pointer.x / 5, 0], 0.25, delta);
    }
  });

  return <group ref={group}>{children}</group>;
};


export default HeroCamera;