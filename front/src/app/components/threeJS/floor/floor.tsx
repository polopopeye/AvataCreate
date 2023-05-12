import React from 'react';

const Floor = (props: any) => {
  return (
    <mesh {...props} recieveShadow>
      <boxBufferGeometry args={[10, 0.25, 10]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  );
};

export default Floor;
