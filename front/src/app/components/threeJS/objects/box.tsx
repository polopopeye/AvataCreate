import React from 'react';

const Box = (props: any) => {
  return (
    <mesh {...props} recieveShadow={true} castShadow>
      <boxBufferGeometry />
      <meshPhysicalMaterial color={'white'} />
    </mesh>
  );
};

export default Box;
