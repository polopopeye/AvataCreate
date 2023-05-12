import { Canvas } from '@react-three/fiber';
import React from 'react';
import OrbitControls from './controls/OrbitControls';
import Floor from './floor/floor';
import Box from './objects/box';
import LightBulb from './objects/lightBulb';
const Scene = () => {
  return (
    <div className=" h-screen w-full ">
      <Canvas
        shadows
        className="canvas"
        camera={{
          position: [-6, 7, 7],
          zoom: 5,
        }}
      >
        <ambientLight color={'white'} intensity={0.2} />
        <LightBulb position={[0, 3, 0]} />
        <Box rotateX={3} rotateY={0.2} />
        <OrbitControls />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
};

export default Scene;
