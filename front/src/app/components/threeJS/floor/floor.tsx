import React from 'react';

const Floor = (props: any) => {
  return (
    <mesh {...props} recieveShadow>
      <boxBufferGeometry args={[5, 0.25, 5]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
};

export default Floor;
