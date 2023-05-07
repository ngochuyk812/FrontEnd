import { configureStore } from '@reduxjs/toolkit';

import authSlice from "./slice/authSlice";
import notifySlice from './slice/notifySlice';
import registerSlice from './slice/registerSlice';
export const store  = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
    notify: notifySlice
        }
})
 