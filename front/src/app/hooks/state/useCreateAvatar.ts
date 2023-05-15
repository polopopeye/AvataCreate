import { fetchAvatarCreate } from '@/app/store/slices/avatar/avatar.action';
import { setCurrentAvatarUrl } from '@/app/store/slices/avatar/avatar.slice';
import { setUserInfo } from '@/app/store/slices/user/user.slice';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useCreateAvatar = () => {
  const {
    token,
    id: userId,
    currentBodyId,
    currentHeadId,
  } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || token === '') return;
    if (!currentHeadId || currentHeadId === '') return;
    if (!currentBodyId || currentBodyId === '') return;

    dispatch(
      fetchAvatarCreate({
        name: userId,
        output_format: 'fbx',
        style: 'phr',
        img: 'test',
        head_id: currentHeadId,
        body_id: currentBodyId,
        create_thumbnail: true,
        optimize: true,
      }) as any,
    )
      .unwrap()
      .then((res: any) => {
        dispatch(setCurrentAvatarUrl(res.avatar_link));
      });
  }, [currentHeadId, currentBodyId]);
};

export default useCreateAvatar;
