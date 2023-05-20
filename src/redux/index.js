import { configureStore } from '@reduxjs/toolkit';

import authSlice from "./slice/authSlice";
import notifySlice from './slice/notifySlice';
import registerSlice from './slice/registerSlice';
import productSlice from "./slice/productSlice";
export const store  = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
    products: productSlice,
    notify: notifySlice
        }
})
 