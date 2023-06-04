import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';

const initialState = {
  products: [],
  productsFilter: [],
  status:''
}

export const getAllProduct = createAsyncThunk('products/getAll', async () => {
  const response = await axios.get('http://localhost:3000/products');
  let data =  JSON.parse(JSON.stringify(response.data))
  return data;
});
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterProducts: (state, action) => {
            state.productsFilter = action.payload
        }
    },
    extraReducers:(builder) => {
      builder
        .addCase(getAllProduct.pending, (state) => {
          state.status = 'loading'

        })
        .addCase(getAllProduct.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.products = action.payload
          state.productsFilter = action.payload

        })
        .addCase(getAllProduct.rejected, (state, action) => {
          state.status = 'failed'
        })

    }
  })
  
export const { filterProducts } = productsSlice.actions

export default productsSlice.reducer
