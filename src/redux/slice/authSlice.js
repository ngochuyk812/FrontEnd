import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  error: null,
  status: '',
  linkTo: '/'
}

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await axios.get('http://localhost:3000/users');
  let data =  response.data
  let user
  user = data.filter(tmp=>{
    return tmp.username === username && tmp.password === password
  })
  console.log("user ", user);
  if(user.length !== 0){
    return {type: 1, user : user[0]};
  }else{
    return  {type: 0, user : null};
  }
});
export const register = createAsyncThunk('auth/register', async ({ username, password, address, phone }) => {
  const responseCheck = await axios.get('http://localhost:3000/users');
  let dataCheck =  responseCheck.data
  let user
  user = dataCheck.filter(tmp=>{
    return tmp.username === username 
  })
  if(user.length !== 0){
    return {type: 0, data : null};
  }else{
    const date = new Date()
    let time = date.getTime()
    const response = await axios.post('http://localhost:3000/users',{id:time,username, password, address, phone});
    let data =  response.data
    return {type: 1, data};
  }

  
});
const profileSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      
      logout: (state, action) => {
        state.user = null
        state.status = 'logout'
        localStorage.setItem('user', null)
      },
      setLinkTo: (state, action) => {
        state.linkTo = action.payload
      },
      setError: (state, action) => {
        state.error = action.payload
      },
    },
    extraReducers:(builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.status = 'loading'
          state.status = ''
            state.error = ''

        })
        .addCase(login.fulfilled, (state, action) => {
          console.log(action);
          if(action.payload.type === 1){
                state.status = 'succeeded'
                state.user = action.payload.user
                state.error = null
                console.log(state.user);
                localStorage.setItem('user', JSON.stringify(action.payload))
          }else{
            state.status = 'error'
            state.error = 'Tài khoản hoặc mật khẩu không chính xác'

          }
          
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed'
          state.user = null
          state.error = action.error.message
        })
        .addCase(register.pending, (state) => {
          state.status = 'loading'
        })
        .addCase(register.fulfilled, (state, action) => {
          if(action.payload.type === 1){
            state.status = 'succeeded'
            
          }else{
            state.status = 'error'
            state.error = 'Tên đăng nhập đã tồn tại hệ thống'

          }
        })
        .addCase(register.rejected, (state, action) => {
          state.status = 'failed'
          state.user = null
          state.error = action.error.message
        });
    }
  })
  
export const { logout, setLinkTo, setError } = profileSlice.actions

export default profileSlice.reducer
