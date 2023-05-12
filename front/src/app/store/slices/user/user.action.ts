import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { apiUserCreate } from '../../endpoints';
import { IUser } from './user.slice';

interface CreateUserData {
  id: string;
  coverImg: string | null;
  email: string | null;
  displayName: string | null;
  language: string;
  token?: string;
}

export const fetchCreateUser = createAsyncThunk(
  'user/fetchCreateUser',
  async (data: CreateUserData, { rejectWithValue, getState }) => {
    const { id, coverImg, email, displayName, language } = data;
    return await axios
      .post(apiUserCreate, {
        id,
        coverImg,
        email,
        displayName,
        language,
      })
      .then((res) => {
        const { id, coverImg, email, displayName, language, token } = res.data;
        return {
          id,
          coverImg,
          email,
          displayName,
          language,
          token,
        };
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  },
);
export const fetchCreateUserReducer = {
  [fetchCreateUser.pending as any]: (state: IUser) => {
    state.fetchCreateUser.loading = true;
  },
  [fetchCreateUser.fulfilled as any]: (state: IUser, action: any) => {
    const { language, token } = action.payload;
    //already set with gauth in useCheckUserInfo
    state.language = language;
    state.token = token;

    state.fetchCreateUser.loading = false;
  },
  [fetchCreateUser.rejected as any]: (state: IUser, action: any) => {
    state.fetchCreateUser.loading = false;
    state.fetchCreateUser.error = action.error.message;
  },
};

export const fetchSignInGoogle = createAsyncThunk(
  'user/fetchSignInGoogle',
  async (data, { rejectWithValue, getState }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider)
      // return await signInWithRedirect(auth, provider)
      .then((result) => {
        console.log(`fastlog => result:`, result);
        const { user } = result;

        const { uid, displayName, email, photoURL } = user;

        return {
          uid,
          displayName,
          email,
          photoURL,
        };
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  },
);
export const fetchSignInGoogleReducer = {
  [fetchSignInGoogle.pending as any]: (state: IUser) => {
    toast.info('Logging in...');
    state.fetchSignInGoogle.loading = true;
  },
  [fetchSignInGoogle.fulfilled as any]: (state: IUser, action: any) => {
    const { uid, displayName, email, photoURL } = action.payload;
    if (uid) state.id = uid;
    if (displayName) state.displayName = displayName;
    if (email) state.email = email;
    if (photoURL) state.coverImg = photoURL;

    state.fetchSignInGoogle.loading = false;
  },
  [fetchSignInGoogle.rejected as any]: (state: IUser, action: any) => {
    toast.error('Error logging in');
    state.fetchSignInGoogle.loading = false;
    state.fetchSignInGoogle.error = action.error.message;
  },
};

export const fetchSignOut = createAsyncThunk(
  'user/fetchSignOut',
  async (data, { rejectWithValue, getState }) => {
    const auth = getAuth();

    return await auth.signOut().catch((error) => {
      return rejectWithValue(error.message);
    });
  },
);
export const fetchSignOutReducer = {
  [fetchSignOut.pending as any]: (state: IUser) => {
    toast.info('Logging out...');
    state.fetchSignOut.loading = true;
  },
  [fetchSignOut.fulfilled as any]: (state: IUser, action: any) => {
    toast.success('Logged out successfully');
    state.id = undefined;
    state.email = undefined;
    state.coverImg = '';
    state.displayName = '';
    state.language = '';

    state.fetchSignOut.loading = false;
  },
  [fetchSignOut.rejected as any]: (state: IUser, action: any) => {
    toast.error('Error logging out');
    state.fetchSignOut.loading = false;
    state.fetchSignOut.error = action.error.message;
  },
};
