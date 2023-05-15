import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  apiAvatarCreate,
  apiAvatarCreateBody,
  apiAvatarCreateHead,
  apiAvatarGetBodies,
  apiAvatarGetHeads,
} from '../../endpoints';
import { IAvatar } from './avatar.slice';

interface CreateAvatarInput {
  name: string;
  output_format: string;
  style: string;
  img: string;
  head_id?: string;
  body_id: string;
  collection_id?: string;
  create_thumbnail: boolean;
  optimize: boolean;
}

interface CreateAvatarHeadInput {
  name: string;
  output_format: string;
  style: string;
  selfie_img: string;
  hair_id?: string;
  hair_color?: Object;
}

export const fetchAvatarCreate = createAsyncThunk(
  'user/fetchAvatarCreate',
  async (data: CreateAvatarInput, { rejectWithValue, getState }) => {
    const {
      user: { token },
    } = getState() as any;

    return await axios
      .post(apiAvatarCreate, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // const { id, coverImg, email, displayName, language } = res.data;
        // return {
        //   id,
        //   coverImg,
        //   email,
        //   displayName,
        //   language,
        // };

        console.log(res.data, 'res.data');
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  },
);
export const fetchAvatarCreateReducer = {
  [fetchAvatarCreate.pending as any]: (state: IAvatar) => {
    toast.update('uploadingAvatar', {
      render: 'Creating avatar...',
      type: toast.TYPE.INFO,
      isLoading: true,
    });

    toast.update('updatingBodyAvatar', {
      render: 'Regenerating Avatar',
      type: toast.TYPE.INFO,
      isLoading: true,
    });

    state.fetchAvatarCreate.loading = true;
  },
  [fetchAvatarCreate.fulfilled as any]: (state: IAvatar, action: any) => {
    toast.update('uploadingAvatar', {
      render: 'Avatar created sucessfully',
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      autoClose: 2000,
    });

    toast.update('updatingBodyAvatar', {
      render: 'Avatar Regenerated',
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      autoClose: 2000,
    });

    state.avatarCreate = action.payload;

    state.fetchAvatarCreate.loading = false;
  },
  [fetchAvatarCreate.rejected as any]: (state: IAvatar, action: any) => {
    state.fetchAvatarCreate.loading = false;
    state.fetchAvatarCreate.error = action.error.message;
  },
};

export const fetchAvatarCreateHead = createAsyncThunk(
  'user/fetchAvatarCreateHead',
  async (data: CreateAvatarHeadInput, { rejectWithValue, getState }) => {
    const {
      user: { token },
    } = getState() as any;

    return await axios
      .post(apiAvatarCreateHead, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data, 'res.data');
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  },
);
export const fetchAvatarCreateHeadReducer = {
  [fetchAvatarCreateHead.pending as any]: (state: IAvatar) => {
    toast.update('uploadingAvatar', { render: 'Creating Avatar head...' });

    state.fetchAvatarCreateHead.loading = true;
  },
  [fetchAvatarCreateHead.fulfilled as any]: (state: IAvatar, action: any) => {
    toast.update('uploadingAvatar', {
      render: 'Avatar head created sucessfully',
      type: toast.TYPE.SUCCESS,
      isLoading: false,
    });

    state.avatarCreateHead = action.payload;

    state.fetchAvatarCreateHead.loading = false;
  },
  [fetchAvatarCreateHead.rejected as any]: (state: IAvatar, action: any) => {
    state.fetchAvatarCreateHead.loading = false;
    state.fetchAvatarCreateHead.error = action.error.message;
  },
};

export const fetchAvatarCreateBody = createAsyncThunk(
  'user/fetchAvatarCreateBody',
  async (
    data: {
      user_id: string;
      body_id: string;
    },
    { rejectWithValue, getState },
  ) => {
    const {
      user: { token },
    } = getState() as any;

    return await axios
      .post(apiAvatarCreateBody, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data, 'res.data');
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  },
);
export const fetchAvatarCreateBodyReducer = {
  [fetchAvatarCreateBody.pending as any]: (state: IAvatar) => {
    toast.update('updatingBodyAvatar', {
      render: 'Loading Avatar Body...',
      type: toast.TYPE.INFO,
      isLoading: true,
      autoClose: false,
    });

    state.fetchAvatarCreateBody.loading = true;
  },
  [fetchAvatarCreateBody.fulfilled as any]: (state: IAvatar, action: any) => {
    toast.update('updatingBodyAvatar', {
      render: 'Updating Body Avatar',
      type: toast.TYPE.INFO,
      isLoading: true,
      autoClose: false,
    });

    state.avatarCreateBody = action.payload;

    state.fetchAvatarCreateBody.loading = false;
  },
  [fetchAvatarCreateBody.rejected as any]: (state: IAvatar, action: any) => {
    state.fetchAvatarCreateBody.loading = false;
    state.fetchAvatarCreateBody.error = action.error.message;
  },
};

export const fetchAvatarGetBodies = createAsyncThunk(
  'user/fetchAvatarGetBodies',
  async (data, { rejectWithValue, getState }) => {
    const {
      user: { token },
    } = getState() as any;

    return await axios
      .get(apiAvatarGetBodies, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, 'res.data');
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  },
);
export const fetchAvatarGetBodiesReducer = {
  [fetchAvatarGetBodies.pending as any]: (state: IAvatar) => {
    state.fetchAvatarGetBodies.loading = true;
  },
  [fetchAvatarGetBodies.fulfilled as any]: (state: IAvatar, action: any) => {
    state.avatarBodies = action.payload;
    state.fetchAvatarGetBodies.loading = false;
  },
  [fetchAvatarGetBodies.rejected as any]: (state: IAvatar, action: any) => {
    state.fetchAvatarGetBodies.loading = false;
    state.fetchAvatarGetBodies.error = action.error.message;
  },
};

export const fetchAvatarGetHeads = createAsyncThunk(
  'user/fetchAvatarGetHeads',
  async (data, { rejectWithValue, getState }) => {
    const {
      user: { token },
    } = getState() as any;

    return await axios
      .get(apiAvatarGetHeads, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, 'res.data');
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(err.message);
      });
  },
);
export const fetchAvatarGetHeadsReducer = {
  [fetchAvatarGetHeads.pending as any]: (state: IAvatar) => {
    state.fetchAvatarGetHeads.loading = true;
  },
  [fetchAvatarGetHeads.fulfilled as any]: (state: IAvatar, action: any) => {
    state.avatarHeads = action.payload;
    state.fetchAvatarGetHeads.loading = false;
  },
  [fetchAvatarGetHeads.rejected as any]: (state: IAvatar, action: any) => {
    state.fetchAvatarGetHeads.loading = false;
    state.fetchAvatarGetHeads.error = action.error.message;
  },
};
