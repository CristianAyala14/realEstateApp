import axios from "axios";


const base_url = `http://localhost:3000/api`



export const axiosCall = axios.create({
    baseURL: base_url ,
    withCredentials: true,
})

