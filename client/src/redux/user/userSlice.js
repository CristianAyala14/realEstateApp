//redux 3: CREAR la porcion de estado. 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading:false,
  isAuthenticated: false,
  accessToken: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defaultState: (state)=>{
      state.user= null;
      state.error= null;
      state.loading=false;
      state.isAuthenticated=false
      state.accessToken=false
    },
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
    setAccesToken:(state,action)=>{
      state.accessToken = action.payload
    }
    ,
    singInFailure: (state, action)=>{
      state.user = null;
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated= false;

    }
  }
});

export const {singInFailure, singInSuccess, singInStart, errorStart,defaultState, setAccesToken} =userSlice.actions;
export default userSlice.reducer;