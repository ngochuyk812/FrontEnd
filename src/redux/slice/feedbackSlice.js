import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
    user:
        localStorage.getItem("user") !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : null,
    feedback:[],
    error: null,
    status: "",
};
export const getIdUser= createAsyncThunk(
    "feedback/getIdUser",
    async (idUser) => {
        const response = await axios.get("http://localhost:3000/users" + idUser);
        let user = response.data;
        return user;

    }
);
export const loadFeedback = createAsyncThunk(
    "auth/loadFeedback",
    async (idUser) => {
        const response = await axios.get("http://localhost:3000/feedback", {
            params: {
                idUser: idUser,
            },
        });
        let data = response.data;
        return data;
    }
);
export const feedbackPost = createAsyncThunk(
    "contact/feedback",
    async (  {
                 name,
                 email,
                 phone,
                 feedback
             } ) => {
        const resp = await axios.post("http://localhost:3000/feedback", {
            name,
            email,
            phone,
            feedback
        });
        let data = resp.data;
        return data;
    }
);
const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(feedbackPost.pending, (state) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(feedbackPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                // action.payload;
                state.comments = [...state.comments, action.payload];
            })
            .addCase(feedbackPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(loadFeedback.pending, (state) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(loadFeedback.fulfilled, (state, action) => {
                state.status = "succeeded";
                // action.payload;
                state.comments = action.payload;
            })
            .addCase(loadFeedback.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    },

});

export const { setError } = feedbackSlice.actions;

export default feedbackSlice.reducer;
