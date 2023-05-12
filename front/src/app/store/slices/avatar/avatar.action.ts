import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  apiAvatarCreate,
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
    state.fetchAvatarCreate.loading = true;
  },
  [fetchAvatarCreate.fulfilled as any]: (state: IAvatar, action: any) => {
    // const {
    //   id,
    //   avatar_link,
    //   thumbnail_url,
    //   created_at,
    //   output_format,
    //   body_id,
    //   head_id,
    //   name,
    //   style,
    // } = action.payload;
    //    "name": "string",
    // "output_format": "glb",
    // "style": "phr",
    // "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    // "avatar_link": "http://example.com",
    // "created_at": "2019-08-24T14:15:22Z",
    // "thumbnail_url": "http://example.com",
    // "body_id": "b83f1dd5-4773-4658-891d-0c7cc9862dc2",
    // "head_id": "d9a1ca39-9208-40eb-9eaa-4615ead368b8"
    toast.success('Avatar created successfully');

    state.avatarCreate = action.payload;

    state.fetchAvatarCreate.loading = false;
  },
  [fetchAvatarCreate.rejected as any]: (state: IAvatar, action: any) => {
    state.fetchAvatarCreate.loading = false;
    state.fetchAvatarCreate.error = action.error.message;
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
    toast.success('Avatar get bodies successfully');
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
    toast.success('Avatar get bodies successfully');
    state.avatarHeads = action.payload;
    state.fetchAvatarGetHeads.loading = false;
  },
  [fetchAvatarGetHeads.rejected as any]: (state: IAvatar, action: any) => {
    state.fetchAvatarGetHeads.loading = false;
    state.fetchAvatarGetHeads.error = action.error.message;
  },
};
