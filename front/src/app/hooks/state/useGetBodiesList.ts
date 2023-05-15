import { fetchAvatarGetBodies } from '@/app/store/slices/avatar/avatar.action';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetBodiesList = () => {
  const { token } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  useMemo(() => {
    if (!token || token === '') return;
    console.log('useGetBodiesList');
    dispatch(fetchAvatarGetBodies() as any);
  }, [token]);
};

export default useGetBodiesList;
