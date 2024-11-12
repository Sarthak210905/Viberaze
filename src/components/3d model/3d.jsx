import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Canvas } from '@react-three/fiber';
import ModelCanvas from './model';

export default function AnimatedModel() {
  const modelRef = useRef();

  // Define spring animations
  const { position } = useSpring({
    position: [0, 1, 0],
    from: { position: [0, -1, 0] },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <Canvas className="flex justify-center -mt-10 mb-4">
      <animated.mesh ref={modelRef} position={position}>
        <ModelCanvas />
      </animated.mesh>
    </Canvas>
  );
}
