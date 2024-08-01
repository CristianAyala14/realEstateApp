//redux 3: CREAR la porcion de estado. 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading:false,
  isAuthenticated: false
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state)=>{
      state.loading = true
    },
    errorStart: (state)=>{
      state.error = null;
    },
    singInSuccess: (state, action)=>{
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthenticated= true;
    },
    singInFailure: (state, action)=>{
      state.user = null;
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated= false;

    }
  }
});

export const {singInFailure, singInSuccess, singInStart, errorStart} =userSlice.actions;
export default userSlice.reducer;