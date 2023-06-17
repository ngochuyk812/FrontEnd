import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';



const initialState = {
    user: localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null,
    error: null,
    status: '',
    linkTo: '/'
}
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ username }) => {
    const response = await axios.get('http://localhost:3000/users');
    let data =  response.data
    let user
    user = data.filter(tmp=>{
        return tmp.username === username
    })
    console.log("user ", user);
    if(user.length !== 0){
        return {type: 1, user : user[0]};
    }else{
        return  {type: 0, user : null};
    }
});
const forgotPassWordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {


        setError: (state, action) => {
            state.error = action.payload
        },
    },
    extraReducers:(builder) => {
        builder

            .addCase(forgotPassword.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                if(action.payload.type === 1){
                    state.status = 'succeeded'

                }else{
                    state.status = 'error'
                    state.error = 'Tên đăng nhập không tồn tại'

                }
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.status = 'failed'
                state.user = null
                state.error = action.error.message

            });
    }
})

export const { setError } = forgotPassWordSlice.actions

export default forgotPassWordSlice.reducer