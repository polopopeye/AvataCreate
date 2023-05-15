import { useFBX } from '@react-three/drei';
import { useSelector } from 'react-redux';
import * as THREE from 'three';

const Character = (props: any) => {
  const { currentAvatarUrl } = useSelector((state: any) => state.avatar);

  const character = useFBX(currentAvatarUrl);

  // const {animations} = useFBX('/animations/dancing1.fbx');

  character.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
      child.frustumCulled = false;
      child.material.transparent = false;
      child.material.depthWrite = true;
      child.material.depthTest = true;
      child.material.side = THREE.DoubleSide;
      child.material.alphaTest = 0.061;
    }
  });

  return <primitive object={character} scale={0.015} {...props} />;
};

export default Character;
