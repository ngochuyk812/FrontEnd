import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  listCarts: [],
  error: null,
  status: "",
  linkTo: "/",
};
export const loadCarts = createAsyncThunk("auth/orders", async () => {
  const response = await axios.get("http://localhost:3000/carts");
  let data = response.data;
  return data;
});
export const addItemIntoCart = createAsyncThunk(
  "auth/addCart",
  async (item) => {
    const response = await axios.post("http://localhost:3000/carts", {
      idProduct: item.id,
      quantity: 1,
    });
    let data = response.data;
    return {
      id: data.id,
      idProduct: item.id,
      quantity: 1,
      status: false,
    };
  }
);

export const delItemCarts = createAsyncThunk("auth/delCart", async (item) => {
  //send id order
  const response = await axios.delete(`http://localhost:3000/carts/${item.id}`);
  let data = response.data;
  return item;
});

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //load cart
      .addCase(loadCarts.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(loadCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const listCartsLs = getListCartsIntoLs();
        if (listCartsLs) {
          action.payload.forEach((item) => {
            listCartsLs.forEach((tmp) => {
              if (item.id == tmp.id) {
                item.status = tmp.status;
              }
            });
          });
          saveListCartIntoLs(action.payload);
        }
        state.listCarts = action.payload;
        state.error = null;
      })
      .addCase(loadCarts.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })
      //add Item into cart
      .addCase(addItemIntoCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const tmp = action.payload;
        console.log(...state.listCarts);
        console.log(tmp);
        state.listCarts = [...state.listCarts, tmp];
        console.log([...state.listCarts, tmp]);
        state.status = "add item into cart";
        state.error = null;
        console.log(123);
        console.log(state.listCarts);
        saveListCartIntoLs(state.listCarts);
      })
      .addCase(addItemIntoCart.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(addItemIntoCart.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      //Delete item from cart

      .addCase(delItemCarts.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(delItemCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listCarts = state.listCarts.filter((tmp) => {
          return tmp.id != action.payload.id;
        });
        saveListCartIntoLs(state.listCarts);
        state.error = null;
      })
      .addCase(delItemCarts.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
    //change quantity item Carts
  },
});

const saveListCartIntoLs = (listCarts) => {
  localStorage.setItem("listCarts", JSON.stringify(listCarts));
};
const getListCartsIntoLs = () => {
  return JSON.parse(localStorage.getItem("listCarts"));
};
export const { removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
