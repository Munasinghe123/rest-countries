import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three';
import { useRef, useEffect, useState } from 'react';

function RotatingGlobe() {
  const globeRef = useRef();
  const colorMap = useLoader(TextureLoader, '/textures/earth.jpg');
  const [globeScale, setGlobeScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 1200) setGlobeScale(1.8);         
      else if (width > 768) setGlobeScale(1.4);     
      else setGlobeScale(1);                        
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <mesh
      ref={globeRef}
      scale={[globeScale, globeScale, globeScale]}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}


export default function Globe() {
  const [cameraZ, setCameraZ] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      setCameraZ(window.innerWidth < 640 ? 9 : 7);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
<div className="w-full flex justify-center items-center h-[60vh] sm:h-[70vh] md:h-[80vh] relative z-10">
<Canvas
        className="w-full max-w-[400px] h-full"
        camera={{ position: [0, 0, cameraZ], fov: 45 }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 2, 5]} intensity={0.7} />
        <RotatingGlobe />
        <OrbitControls enableZoom={false}  enablePan={false} autoRotate autoRotateSpeed={1}  />
      </Canvas>
    </div>
  );
}
