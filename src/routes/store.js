import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../ogp-frontend/src/redux/slices/authSlice';
import uiReducer from '../../../ogp-frontend/src/redux/slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;