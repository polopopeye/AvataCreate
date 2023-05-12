import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAvatarCreateReducer,
  fetchAvatarGetBodiesReducer,
  fetchAvatarGetHeadsReducer,
} from './avatar.action';

export interface IAvatar {
  avatarBodies: any[];
  avatarHeads: any[];
  avatarCreate: any;
  fetchAvatarCreate: {
    loading: boolean;
    error: string;
  };
  fetchAvatarGetBodies: {
    loading: boolean;
    error: string;
  };
  fetchAvatarGetHeads: {
    loading: boolean;
    error: string;
  };
}

const initialState: IAvatar = {
  avatarBodies: [],
  avatarHeads: [],
  avatarCreate: undefined,
  fetchAvatarCreate: {
    loading: false,
    error: '',
  },
  fetchAvatarGetBodies: {
    loading: false,
    error: '',
  },
  fetchAvatarGetHeads: {
    loading: false,
    error: '',
  },
};

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {},
  extraReducers: {
    ...fetchAvatarCreateReducer,
    ...fetchAvatarGetBodiesReducer,
    ...fetchAvatarGetHeadsReducer,
  },
});

export const {} = avatarSlice.actions;

export default avatarSlice.reducer;
