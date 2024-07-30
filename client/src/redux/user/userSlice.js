import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading:false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state)=>{
      state.loading = true
    },
    singInSuccess: (state, action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    singInFailure: (state, action)=>{
      state.error = action.payload;
      state.loading = false;
      state.error = null;
    }
  }
});

export const {singInFailure, singInSuccess, singInStart} =userSlice.actions;
export default userSlice.reducer;