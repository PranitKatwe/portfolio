"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -clock.getElapsedTime() * 0.15;
      wireRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Inner glowing sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.8, 64, 64]} />
          <MeshDistortMaterial
            color="#00d4ff"
            wireframe={false}
            distort={0.15}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Wireframe outer sphere */}
        <mesh ref={wireRef} scale={1.05}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial
            color="#00d4ff"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Orbiting ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.5, 0.01, 8, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
        </mesh>

        {/* Second orbiting ring */}
        <mesh rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
          <torusGeometry args={[2.8, 0.008, 8, 100]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </mesh>

        {/* Core glow */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}
