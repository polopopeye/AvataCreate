/* eslint-disable @next/next/no-img-element */
import {
  fetchAvatarCreate,
  fetchAvatarCreateHead,
} from '@/app/store/slices/avatar/avatar.action';
import { fetchUpdateUser } from '@/app/store/slices/user/user.action';
import { setUserInfo } from '@/app/store/slices/user/user.slice';
import fileToBase64 from '@/app/utils/convert/fileToBase64';
import FileToBinaryString from '@/app/utils/convert/fileToBinaryString';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from '../general/avatar/avatar';

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const {
    email,
    displayName,
    id: userId,
    currentBodyId,
  } = useSelector((state: any) => state.user);
  const {} = useSelector((state: any) => state.avatar);

  const handleAvatarChange = async () => {
    toast.info('Loading Picture...', {
      toastId: 'uploadingAvatar',
      isLoading: true,
      autoClose: false,
    });
    const inputFile = document.getElementById('changeAvatar') as any;

    if (!inputFile) return;
    const file = inputFile.files?.[0];

    if (!file) return;

    const fileInBase64 = (await fileToBase64(file)) as string;

    dispatch(
      fetchAvatarCreateHead({
        name: userId,
        output_format: 'fbx',
        style: 'phr',
        selfie_img: fileInBase64 as string,
      }) as any,
    )
      .unwrap()
      .then((res: any) => {
        dispatch(setUserInfo({ currentHeadId: res.id }) as any);
        dispatch(
          fetchUpdateUser({ id: userId, coverImg: fileInBase64 }) as any,
        );
      });

    inputFile.value = '';
  };

  return (
    <div>
      <div className="form-control w-full max-w-xs mx-auto mb-8">
        <div
          className="cursor-pointer hover:opacity-80 hover:shadow-lg hover:scale-105"
          onClick={() => document.getElementById('changeAvatar')?.click()}
        >
          <Avatar />
          <input
            type="file"
            id="changeAvatar"
            onChange={handleAvatarChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <label className="label">
          <span className="label-text">Display Name</span>
        </label>
        <input
          type="text"
          placeholder={displayName}
          disabled
          className="input input-bordered w-full max-w-xs"
        />

        <label className="label">
          <span className="label-text">email</span>
        </label>
        <input
          type="text"
          placeholder={email}
          disabled
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
