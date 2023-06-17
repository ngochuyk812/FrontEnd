import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listProducts: [],
  error: null,
  status: "",
  linkTo: "/",
};
export const loadProducts = createAsyncThunk("auth/products", async () => {
  const response = await axios.get("http://localhost:3000/products");
  let data = response.data;
  return data;
});

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
      state.listProducts.forEach((item) => {
        if (item.id == tmp.id) {
          if (action.payload.type == 1) {
            item.status = true;
          } else {
            item.status = false;
          }
        }
      });
      saveListProductIntoLs(state.listProducts);
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
        state.listProducts = action.payload;
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
