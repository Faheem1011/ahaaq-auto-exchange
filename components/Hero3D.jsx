"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three';

function AbstractCarShape() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        {/* Extremely premium glass/pearl material simulating sleek car paint/aerodynamics */}
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.5}
          temporalDistortion={0.0}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#fefefe"
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#FAFAFA']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, -0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <AbstractCarShape />
        </PresentationControls>
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
}
