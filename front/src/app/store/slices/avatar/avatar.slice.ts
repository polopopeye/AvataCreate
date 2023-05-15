import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAvatarCreateBodyReducer,
  fetchAvatarCreateHeadReducer,
  fetchAvatarCreateReducer,
  fetchAvatarGetBodiesReducer,
  fetchAvatarGetHeadsReducer,
} from './avatar.action';

export interface IAvatar {
  currentAvatarUrl: string | undefined;
  avatarBodies: any[];
  avatarHeads: any[];
  avatarCreate: any;
  avatarCreateHead: any;
  avatarCreateBody: any;

  fetchAvatarCreate: {
    loading: boolean;
    error: string;
  };
  fetchAvatarCreateHead: {
    loading: boolean;
    error: string;
  };
  fetchAvatarCreateBody: {
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
  currentAvatarUrl: undefined,
  avatarBodies: [],
  avatarHeads: [],
  avatarCreate: undefined,
  avatarCreateHead: undefined,
  avatarCreateBody: undefined,

  fetchAvatarCreate: {
    loading: false,
    error: '',
  },
  fetchAvatarCreateHead: {
    loading: false,
    error: '',
  },
  fetchAvatarCreateBody: {
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
  reducers: {
    setCurrentAvatarUrl: (state, action) => {
      state.currentAvatarUrl = action.payload;
    },
  },
  extraReducers: {
    ...fetchAvatarCreateReducer,
    ...fetchAvatarCreateHeadReducer,
    ...fetchAvatarCreateBodyReducer,
    ...fetchAvatarGetBodiesReducer,
    ...fetchAvatarGetHeadsReducer,
  },
});

export const { setCurrentAvatarUrl } = avatarSlice.actions;

export default avatarSlice.reducer;
