import {createContext, useState, useContext, useEffect} from "react";
import { singUpReq, singInReq } from "../apiCalls/authCalls.js";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const singUp = async (user) =>{
        try {
            setErrors("");
            setLoading(true)
            const res = await singUpReq(user);
            if(res.status === 200){
                setUser(res.user)
                setIsAuthenticated(true)
                setErrors("");
                setLoading(false)
                navigate("/")
            }
            if(res.status===400){
                setErrors(res.data)
                setUser({})
                setIsAuthenticated(false);
                setLoading(false)
            }
        } catch (error) {
            setErrors("Network or other error.")
            console.error("Network or other error:", error);
        }

    }

    const singIn = async (user) =>{
        try {
            setErrors("");
            setLoading(true)

            const res = await singInReq(user);
            if(res.status === 200){
                setUser(res.user)
                setIsAuthenticated(true)
                setErrors("");
                setLoading(false)
                navigate("/")

            }
            if(res.status===400){
                setErrors(res.data)
                setUser({})
                setIsAuthenticated(false);
                setLoading(false)

            }
            console.log(res)
        } catch (error) {
            setErrors("Network or other error.")
            console.error("Network or other error:", error);
        }
    }


    return (
        <authContext.Provider value={{singUp, singIn, errors, loading, setLoading}}>
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