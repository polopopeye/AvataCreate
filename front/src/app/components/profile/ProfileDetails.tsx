/* eslint-disable @next/next/no-img-element */
import { fetchAvatarCreate } from '@/app/store/slices/avatar/avatar.action';
import fileToBase64 from '@/app/utils/convert/fileToBase64';
import FileToBinaryString from '@/app/utils/convert/fileToBinaryString';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from '../general/avatar/avatar';

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const { email, displayName } = useSelector((state: any) => state.user);

  const handleAvatarChange = async () => {
    toast.info('Loading Picture...', {
      toastId: 'uploadingAvatar',
    });
    const inputFile = document.getElementById('changeAvatar') as any;

    if (!inputFile) return;
    const file = inputFile.files?.[0];

    if (!file) return;

    // const fileInBinary = await FileToBinaryString(file);
    const fileInBinary = await fileToBase64(file);

    dispatch(
      fetchAvatarCreate({
        name: 'test1234',
        output_format: 'glb',
        style: 'phr',
        img: fileInBinary as string,
        head_id: '43f21614-c7a2-4c3f-907f-c02ac3ec1e9b',
        body_id: '4d8ac7df-c579-4ca5-a089-629a2659f3c0', //TODO: UPDATE THIS TO THE ACTUAL BODY ID
        // collection_id?: string;
        create_thumbnail: true,
        optimize: true,
      }) as any,
    );
    // 3842adbc-e31c-408f-94cd-7969af8cdd83
    console.log(`fastlog => fileInBinary:`, fileInBinary);

    inputFile.value = '';

    toast.dismiss('uploadingAvatar');
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
