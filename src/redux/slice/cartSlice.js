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
      color: item.color,
      quantity: 1,
    });
    let data = response.data;
    return {
      id: data.id,
      idProduct: item.id,
      color: item.color,
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
export const changeQuantityItemCarts = createAsyncThunk(
  "auth/changeQuantity",
  async (item) => {
    const quantity = item.type ? item.quantity + 1 : item.quantity - 1;
    const response = await axios.patch(
      `http://localhost:3000/carts/${item.id}`,
      {
        quantity: quantity,
      }
    );
    let data = response.data;
    return {
      ...item,
      quantity,
    };
  }
);
export const changeColorItemCarts = createAsyncThunk(
  "auth/changeColor",
  async (item) => {
    console.log(item);
    const response = await axios.patch(
      `http://localhost:3000/carts/${item.id}`,
      {
        color: item.color,
      }
    );
    let data = response.data;
    return {
      ...item,
    };
  }
);
const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    changeStatusCart: (state, action) => {
      const tmp = action.payload;
      state.user = null;
      state.status = "change status";
      state.listCarts.forEach((item) => {
        if (item.id == tmp.id) {
          item.status = tmp.status;
        }
      });
      saveListCartIntoLs(state.listCarts);
    },
  },
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
        console.log(98);
        const tmp = action.payload;
        console.log(...state.listCarts);
        console.log(tmp);
        state.listCarts = [...state.listCarts, tmp];
        console.log([...state.listCarts, tmp]);
        state.status = "add item into cart";
        state.error = null;
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
      })
      //change quantity item Carts
      .addCase(changeQuantityItemCarts.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(changeQuantityItemCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listCarts.forEach((item) => {
          if (item.id == action.payload.id) {
            item.quantity = action.payload.quantity;
          }
        });
        saveListCartIntoLs(state.listCarts);
        state.error = null;
      })
      .addCase(changeQuantityItemCarts.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(changeColorItemCarts.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(changeColorItemCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(1);
        state.listCarts.forEach((item) => {
          if (item.id == action.payload.id) {
            item.color = action.payload.color;
          }
        });
        saveListCartIntoLs(state.listCarts);
        state.error = null;
      })
      .addCase(changeColorItemCarts.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

const saveListCartIntoLs = (listCarts) => {
  console.log(JSON.stringify(listCarts));
  localStorage.setItem("listCarts", JSON.stringify(listCarts));
};
const getListCartsIntoLs = () => {
  return JSON.parse(localStorage.getItem("listCarts"));
};
export const { removeItemFromCart, changeStatusCart } = cartSlice.actions;
export default cartSlice.reducer;
