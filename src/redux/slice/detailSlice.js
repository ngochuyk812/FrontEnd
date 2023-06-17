import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


const initialState = {
    product:null,
    status : '',
    error:''
}
export const getProduct = createAsyncThunk('detail/getProductById', async (id) => {

    let response = await  axios.get(process.env.REACT_APP_API + "/products/" + id)
    let product = response.data
    return product



});
const detailSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {

                state.status = "loading";
                state.error = ''

            })
            .addCase(getProduct.fulfilled, (state, action) => {

                state.status = "succeeded";

                state.product = action.payload
                console.log(action.payload)
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;

            })
    },
  })
  

export default detailSlice.reducer
