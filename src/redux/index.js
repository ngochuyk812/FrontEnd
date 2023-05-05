import { configureStore } from '@reduxjs/toolkit';
import profileSlice from "./slice/profile";
export const store  = configureStore({
  reducer: {
    profile: profileSlice
        }
})
 