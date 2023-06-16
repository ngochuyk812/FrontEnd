import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  productsFilter: [],
  error: null,
  status: "",
  linkTo: "/",

};
export const loadProducts = createAsyncThunk("auth/products", async () => {
  const response = await axios.get("http://localhost:3000/products");
  let data = response.data;
  return data;
});
export const changeQuantity = createAsyncThunk(
  "auth/changeQuantity",
  async (item) => {
    let quantity;
    if (item.type == 0) {
      quantity = item.quantity + item.count;
    } else {
      quantity = item.quantity - item.count;
    }
    const response = await axios.patch(
      `http://localhost:3000/products/${item.id}`,
      {
        quantity,
      }
    );
    let data = response.data;
    return {
      id: item.id,
      quantity: quantity,
    };
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      state.productsFilter = action.payload;
    },
    changeStatus: (state, action) => {
      const tmp = action.payload;
      state.status = "change status";
      state.products.forEach((item) => {
        if (item.id == tmp.id) {
          if (action.payload.type == 1) {
            item.status = true;
          } else {
            item.status = false;
          }
        }
      });
      saveListProductIntoLs(state.products);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const listProductLS = getListProductIntoLs();
        if (listProductLS) {
          action.payload.forEach((item) => {
            listProductLS.forEach((tmp) => {
              if (item.id == tmp.id) {
                item.status = tmp.status;
              }
            });
          });
        }
        saveListProductIntoLs(action.payload);
        state.products = action.payload;
        state.productsFilter = action.payload;
        console.log(state.products)
        state.error = null;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

const saveListProductIntoLs = (listProducts) => {
  localStorage.setItem("listProducts", JSON.stringify(listProducts));
};
const getListProductIntoLs = () => {
  return JSON.parse(localStorage.getItem("listProducts"));
};

export const { filterProducts, changeStatus } = productsSlice.actions;

export default productsSlice.reducer;
