import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  products: [],
  productsFilter: [],
  status: "",
};

export const getAllProduct = createAsyncThunk("products/getAll", async () => {
  const response = await axios.get("http://localhost:3000/products");
  let data = JSON.parse(JSON.stringify(response.data));
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
      .addCase(getAllProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
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
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.status = "failed";
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
