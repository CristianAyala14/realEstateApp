import {createContext, useState, useContext, useEffect} from "react";
import { singUpReq, singInReq } from "../apiCalls/authCalls.js";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

//redux
import { useDispatch } from 'react-redux';
import { singInStart, singInSuccess, singInFailure, errorStart } from '../redux/user/userSlice';

const authContext = createContext();

export const AuthContextProvider = ({children})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const singUp = async (user) =>{
        try {
            dispatch(errorStart());
            dispatch(singInStart());
            const res = await singUpReq(user);
            if(res.status === 200){
                dispatch(singInSuccess(res.user));
                navigate("/")
            }
            if(res.status===400){
                dispatch(singInFailure(res.data));
            }
        } catch (error) {
            dispatch(singInFailure("Network or other error"))
            console.error("Network or other error:", error);
        }

    }

    const singIn = async (user) =>{
        try {
            dispatch(errorStart());
            dispatch(singInStart());

            const res = await singInReq(user);
            if(res.status === 200){
                dispatch(singInSuccess(res.user));
                navigate("/")

            }
            if(res.status===400){
                dispatch(singInFailure(res.data));
            }
            console.log(res)
        } catch (error) {
            dispatch(singInFailure("Network or other error"))
            console.error("Network or other error:", error);
        }
    }


    return (
        <authContext.Provider value={{singUp, singIn}}>
            {children}
        </authContext.Provider>
    )
    
}

export const useAuthContext = ()=>{
    const context = useContext(authContext)
    if(!context){
        throw new Error("useAuthContext must be used within a provider")
    }
    return context;
}