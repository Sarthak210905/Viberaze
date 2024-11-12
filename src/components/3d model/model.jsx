import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model(props) {
  const modelRef = useRef();
  const { scene } = useGLTF('/scene.gltf'); // Corrected path

  // Example animation: Rotate the model
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Rotate around the Y axis
    }
  });

  return <primitive ref={modelRef} object={scene} {...props} />;
}

export default function ModelCanvas() {
  return (
    <Canvas className=''>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Model position={[0, -1, 0]} />
    </Canvas>
  );
}
