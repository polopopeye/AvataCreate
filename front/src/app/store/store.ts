import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import avatarSlice from './slices/avatar/avatar.slice';
import userSlice from './slices/user/user.slice';

const persistConfig = {
  key: 'intershare',
  storage,
  // whitelist: ['uploadFile'],
  // blacklist: ['infoFile'],
};

const rootReducer = {
  user: userSlice,
  avatar: avatarSlice,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      ignoreActions: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
  // Config for Redux DevTools to improve performance (I have a lot of crashes without this)
  devTools: {
    maxAge: 3,
    latency: 1500,
    autoPause: true,
    trace: false,
    features: {
      persist: true,
      jump: false,
      skip: false,
      reorder: false,
      dispatch: false,
      test: false,
    },
  },
});

// export const persistor = persistStore(store);

export default store;
