import {createContext, useState, useContext, useEffect} from "react";
import { singUpReq, singInReq , logOutReq} from "../apiCalls/authCalls.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//redux
import { useDispatch } from 'react-redux';
import { singInStart, singInSuccess, singInFailure, errorStart,setAccesToken, defaultState } from '../redux/user/userSlice';

const authContext = createContext();

export const AuthContextProvider = ({children})=>{
    
    const {error, loading}= useSelector((state)=> state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const singUp = async (user) => {
        try {
            dispatch(errorStart());
            dispatch(singInStart());
            const res = await singUpReq(user);
            if (res.status === 200) {
                dispatch(singInSuccess(res.user));
                dispatch(setAccesToken(res.accessToken))
                navigate("/");
            } else {
                dispatch(singInFailure(res.data));
            }
        } catch (error) {
            dispatch(singInFailure("Network or other error"));
        }
    };

    const singIn = async (user) =>{
        try {
            dispatch(errorStart());
            dispatch(singInStart());
            const res = await singInReq(user);
            console.log(res)
            if(res.status === 200){
                dispatch(singInSuccess(res.user));
                dispatch(setAccesToken(res.accessToken))
                navigate("/")
            }else {
                dispatch(singInFailure(res.data));
            }
        } catch (error) {
            dispatch(singInFailure("Network or other error"));
        }
    }

    const logOut = async () =>{
        dispatch(defaultState());
            const res = await logOutReq();
            console.log(res)
            navigate("/sing-in")
    }


    return (
        <authContext.Provider value={{singUp, singIn, logOut, error, loading}}>
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