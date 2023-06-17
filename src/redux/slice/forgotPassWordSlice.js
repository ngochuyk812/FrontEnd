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
    const response = await axios.get(process.env.REACT_APP_API + '/users');
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
export const changePassword = createAsyncThunk('auth/changlePasswordV2', async ( password) => {
    let id = localStorage.getItem('idForgot')
    let userFull = await  axios.get(process.env.REACT_APP_API + "/users/" + id)
    userFull = userFull.data
    userFull = {...userFull, password: password}
    await axios.put(process.env.REACT_APP_API + '/users/'+userFull.id, userFull);

    return {type:'susscess', mess: "Thay đổi mật khẩu thành công"}

});
const forgotPasswordSlice = createSlice({
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
                    localStorage.setItem('idForgot', action.payload.user.id)
                }else{
                    state.status = 'error'
                    state.error = 'Tên đăng nhập không tồn tại'

                }
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            }).addCase(changePassword.pending, (state) => {
        })
            .addCase(changePassword.fulfilled, (state, action) => {

            })
            .addCase(changePassword.rejected, (state, action) => {

            });

    }
})

export const { setError } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer