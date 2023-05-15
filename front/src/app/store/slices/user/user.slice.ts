import { randomAnimalEmoji } from '@/app/utils/misc/randomEmoji';
import { createSlice } from '@reduxjs/toolkit';

import {
  fetchCreateUserReducer,
  fetchSignInGoogleReducer,
  fetchSignOutReducer,
  fetchUpdateUserReducer,
} from './user.action';

export interface IUser {
  id: string | undefined;
  email: string | undefined;
  coverImg: string | undefined;
  displayName: string;
  language: string;
  token?: string;

  currentBodyId?: string;
  currentAvatarId?: string;
  currentHeadId?: string;

  fetchSignInGoogle: {
    loading: boolean;
    error: string;
  };
  fetchSignOut: {
    loading: boolean;
    error: string;
  };
  fetchCreateUser: {
    loading: boolean;
    error: string;
  };
  fetchUpdateUser: {
    loading: boolean;
    error: string;
  };
}

const initialState: IUser = {
  id: undefined,
  email: undefined,
  coverImg: randomAnimalEmoji(),
  displayName: '',
  language: '',

  currentBodyId: undefined,
  currentAvatarId: undefined,
  currentHeadId: undefined,

  fetchSignInGoogle: {
    loading: false,
    error: '',
  },
  fetchSignOut: {
    loading: false,
    error: '',
  },
  fetchCreateUser: {
    loading: false,
    error: '',
  },
  fetchUpdateUser: {
    loading: false,
    error: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const {
        id,
        email,
        coverImg,
        displayName,
        language,
        currentBodyId,
        currentAvatarId,
        currentHeadId,
      } = action.payload;

      if (id) state.id = id;
      if (email) state.email = email;
      if (coverImg) state.coverImg = coverImg;
      if (displayName) state.displayName = displayName;
      if (language) state.language = language;
      if (currentBodyId) state.currentBodyId = currentBodyId;
      if (currentAvatarId) state.currentAvatarId = currentAvatarId;
      if (currentHeadId) state.currentHeadId = currentHeadId;
    },
    setEmptyUserInfo: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    ...fetchSignInGoogleReducer,
    ...fetchSignOutReducer,
    ...fetchCreateUserReducer,
    ...fetchUpdateUserReducer,
  },
});

export const { setUserInfo, setEmptyUserInfo } = userSlice.actions;

export default userSlice.reducer;
