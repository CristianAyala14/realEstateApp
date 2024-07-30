import axios from "axios";

export const axiosCall = axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: true
})