import {createContext, useState, useContext, useEffect} from "react";
import { singUpReq } from "../api/authCalls.js";
import Cookies from "js-cookie"

const authContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)


    const singUp = async (user) =>{
        try {
            const res = await singUpReq(user);
            if(res.status === 200){
                setUser(res.user)
                setIsAuthenticated(true)
                setRegisterErrors("");
            }
            if(res.status===400){
                setErrors(res.data)
                setUser({})
                setIsAuthenticated(false);
            }
        } catch (error) {
            setErrors("Network or other error.")
            console.error("Network or other error:", error);
        }
    }


    return (
        <authContext.Provider value={{singUp, loading}}>
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