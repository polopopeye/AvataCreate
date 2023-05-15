// import { useFBX } from '@react-three/drei';
import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
// import OrbitControls from './controls/OrbitControls';
import Floor from './floor/floor';
import Character from './objects/character';
import LightBulb from './objects/lightBulb';

const Scene = () => {
  // 223f100e-9416-4194-99a5-710abe9faa8f
  return (
    <div className=" h-screen w-full ">
      <Canvas
        shadows
        className="canvas"
        camera={{
          position: [-1, 6, 14],
          zoom: 7,
        }}
      >
        <ambientLight color={'white'} intensity={0.22} />
        <LightBulb position={[0, 3.5, 2.5]} dragable={true} />

        <OrbitControls
          makeDefault
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 8}
          zoomSpeed={0.5}
          maxDistance={30}
          minDistance={5}
          panSpeed={0.07}
          enablePan={true}
        />
        <Character position={[0, -0.84, 0]} />
        <Environment preset="lobby" background blur={0.5} />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
};

export default Scene;
