import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/authSlice";
import notifySlice from "./slice/notifySlice";
import registerSlice from "./slice/registerSlice";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
import orderSlice from "./slice/orderSlice";
import forgotPassWordSlice from "./slice/forgotPassWordSlice";
import detailSlice from "./slice/detailSlice";
import feedbackSlice from "./slice/feedbackSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    register: registerSlice,
    notify: notifySlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    forgotPassWord: forgotPassWordSlice,
    detail:detailSlice,
    feedback: feedbackSlice
  },
});
