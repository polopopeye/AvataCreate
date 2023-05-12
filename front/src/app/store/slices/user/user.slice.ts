import { randomAnimalEmoji } from '@/app/utils/misc/randomEmoji';
import { createSlice } from '@reduxjs/toolkit';

import {
  fetchCreateUserReducer,
  fetchSignInGoogleReducer,
  fetchSignOutReducer,
} from './user.action';

export interface IUser {
  id: string | undefined;
  email: string | undefined;
  coverImg: string | undefined;
  displayName: string;
  language: string;
  token?: string;

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
}

const initialState: IUser = {
  id: undefined,
  email: undefined,
  coverImg: randomAnimalEmoji(),
  displayName: '',
  language: '',

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
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { id, email, coverImg, displayName, language } = action.payload;

      if (id) state.id = id;
      if (email) state.email = email;
      if (coverImg) state.coverImg = coverImg;
      if (displayName) state.displayName = displayName;
      if (language) state.language = language;
    },
    setEmptyUserInfo: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    ...fetchSignInGoogleReducer,
    ...fetchSignOutReducer,
    ...fetchCreateUserReducer,
  },
});

export const { setUserInfo, setEmptyUserInfo } = userSlice.actions;

export default userSlice.reducer;
