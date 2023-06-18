import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  user:
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  error: null,
  status: "",
  linkTo: "/",
  mess:'',
  changePass:false
};

export const updateProfilee = createAsyncThunk('auth/updateProfile', async (user ) => {
    console.log(initialState.user , "dsdsd")
    const userFull = await  axios.get(process.env.REACT_APP_API + "/users/" + user.id)
    let userNew = userFull.data
    userNew = {id: userNew.id, password: userNew.password, ...user}
    console.log(userNew)

    const responseCheck = await axios.put('http://localhost:3000/users/'+user.id, userNew);
    let data =  responseCheck.data
    delete userNew.password
    return userNew
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const response = await axios.get(process.env.REACT_APP_API + "/users");
    let data = response.data;
    let user;
    user = data.filter((tmp) => {
      console.log();
      //fix
      return tmp.username === username && tmp.password === password;
    });
    console.log("user ", user);
    if (user.length !== 0) {
      return { type: 1, user: user[0] };
    } else {
      return { type: 0, user: null };
    }
  }
);
export const changePassword = createAsyncThunk('auth/changlePassword', async ( {password, passwordNew}) => {

    let userFull = await  axios.get(process.env.REACT_APP_API + "/users/" + initialState.user.id)
    userFull = userFull.data
    if(userFull.password !== password){
        return {type:'error', mess: "Mật khẩu cũ không chính xác"}
    }else{
        userFull = {...userFull, password: passwordNew}
        await axios.put('http://localhost:3000/users/'+userFull.id, userFull);
        return {type:'susscess', mess: "Thay đổi mật khẩu thành công"}
    }


});
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, address, phone }) => {
    const responseCheck = await axios.get(process.env.REACT_APP_API + "/users");
    console.log(responseCheck.data);
    let dataCheck = responseCheck.data;
    let user;
    user = dataCheck.filter((tmp) => {
      return tmp.username === username;
    });
    if (user.length !== 0) {
      return { type: 0, data: null };
    } else {
      const date = new Date();
      let time = date.getTime();
      const response = await axios.post(process.env.REACT_APP_API + "/users", {
        id: time,
        username,
        password,
        address,
        phone,
      });
      let data = response.data;
      return { type: 1, data };
    }
  }
);
const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.status = "logout";
      localStorage.setItem("user", null);
    },
    setLinkTo: (state, action) => {
      state.linkTo = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
      setChangePass: (state, action) => {
          state.changePass = action.payload;
          state.mess= ''
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload.type === 1) {
          let user = action.payload.user;
          delete user.password;
          state.status = "succeeded";
          state.user = user;
          state.error = null;
          console.log(state.user);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          state.status = "error";
          state.error = "Tài khoản hoặc mật khẩu không chính xác";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        if (action.payload.type === 1) {
          state.status = "succeeded";
        } else {
          state.status = "error";
          state.error = "Tên đăng nhập đã tồn tại hệ thống";
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })
        .addCase(updateProfilee.pending, (state) => {
            state.status = "loading";
            state.action = "";
            state.error = "";

        })
        .addCase(updateProfilee.fulfilled, (state, action) => {
            let user = action.payload
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
            state.status = 'succeeded'
            state.action = 'updateProfile'

        })
        .addCase(updateProfilee.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message

        })
        .addCase(changePassword.pending, (state) => {

            state.status = "loading";
            state.error = ''
            state.mess = ''
            state.changePass = false

        })
        .addCase(changePassword.fulfilled, (state, action) => {

            if(action.payload.type === 'error'){
                state.status = "failed";
                state.mess = action.payload.mess
            }else{
                state.status = "succeeded";
                state.mess = action.payload.mess

            }
            state.changePass = true

        })
        .addCase(changePassword.rejected, (state, action) => {
            state.status = "failed";

            state.error = action.error.message;
            state.mess = action.error.message;
            state.changePass = true

        })
  },
});

export const { logout, setLinkTo, setChangePass } = profileSlice.actions;

export default profileSlice.reducer;
