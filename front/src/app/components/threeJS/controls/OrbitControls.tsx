import React from 'react';
import { extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });
function Controls(props: any) {
  const { camera, gl } = useThree();
  return (
    // @ts-ignore
    <orbitControls
      attach={'orbitControls'}
      args={[camera, gl.domElement]}
      maxPolarAngle={Math.PI / 2.2}
      minPolarAngle={Math.PI / 8}
      // maxAzimuthAngle={Math.PI / 4}
      // minAzimuthAngle={-Math.PI / 4}
      zoomSpeed={0.5}
      maxDistance={20}
      minDistance={5}
      panSpeed={0.5}
      enablePan={false}
    />
  );
}

export default Controls;
