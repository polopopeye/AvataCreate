/* eslint-disable @next/next/no-img-element */
import fileToBase64 from '@/app/utils/convert/fileToBase64';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from '../general/avatar/avatar';

const ProfileDetails = () => {
  const { email, displayName } = useSelector((state: any) => state.user);

  const handleAvatarChange = async () => {
    toast.info('Loading Picture...', {
      toastId: 'uploadingAvatar',
    });
    const inputFile = document.getElementById('changeAvatar') as any;

    if (!inputFile) return;
    const file = inputFile.files?.[0];

    if (!file) return;

    const fileBase64 = await fileToBase64(file);

    console.log(`fastlog => fileBase64:`, fileBase64);

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
