import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    error: null,
    status: ''
}
export const resetPassWord = createAsyncThunk('auth/resetPassword', async ({username,password}) => {
    const responseCheck = await axios.get('http://localhost:3000/users');
    let dataCheck =  responseCheck.data
    let user
    user = dataCheck.filter(tmp=>{
        return tmp.password === password
    })
    if(user.length === 0){
        return {type: 0, data : null};
    }else{
        const date = new Date()
        let time = date.getTime()
        const response = await axios.post('http://localhost:3000/users',
            {  id:time,

                password,
                 });
        let data =  response.data
        return {type: 1, data};

    }


});


const resetPassWordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {


        setError: (state, action) => {
            state.error = action.payload
        },
    },
    extraReducers:(builder) => {
        builder

            .addCase(resetPassWord.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(resetPassWord.fulfilled, (state, action) => {
                if(action.payload.type === 1){
                    state.status = 'succeeded'

                }else{
                    state.status = 'error'
                    state.error = 'Mật khẩu không hợp lệ'

                }
            })
            .addCase(resetPassWord.rejected, (state, action) => {
                state.status = 'failed'
                state.user = null
                state.error = action.error.message
            });
    }
})

export const { setError } = resetPassWordSlice.actions

export default resetPassWordSlice.reducer