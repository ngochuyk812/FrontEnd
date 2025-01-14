import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
const initialState = {
  product: null,
  comments: [],
  status: "",
  error: "",
};
export const getProduct = createAsyncThunk(
  "detail/getProductById",
  async (id) => {
    let response = await axios.get(
      process.env.REACT_APP_API + "/products/" + id
    );
    let product = response.data;
    return product;
  }
);


export const loadComment = createAsyncThunk(
  "auth/loadComment",
  async (idProduct) => {
    const response = await axios.get("http://localhost:3000/comments", {
      params: {
        idProduct: idProduct,
      },
    });
    let data = response.data;
    return data;
  }
);
export const commentReviewPost = createAsyncThunk(
  "detail/comments",
  async (comments) => {
    const resp = await axios.post("http://localhost:3000/comments", {
      ...comments,
    });
    let data = resp.data;
    return data;
  }
);
const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(commentReviewPost.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(commentReviewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // action.payload;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(commentReviewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loadComment.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(loadComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        // action.payload;
        state.comments = [...action.payload];
      })
      .addCase(loadComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { setError } = detailSlice.actions;

export default detailSlice.reducer;
