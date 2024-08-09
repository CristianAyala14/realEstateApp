import {z} from "zod";

const userRegex  = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const singUpSchema = z.object({

    userName: z.string({
        required_error: "Username is required"
    }).regex(userRegex, { message: "Invalid username. Must be 8-16 characters, start with a letter, and contain only letters, numbers, underscores, or hyphens." })
    
    ,
    
    email: z.string({
        required_error:"Email is required"}).email({
        message: "Invalid email"
    }).regex(emailRegex,{message: "Invalid email."}),

    password: z.string({
        required_error: "Password is required"
    }).regex(passwordRegex, { message: "Password must be 8-16 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%)." })

}) 


export const singInSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({message: "Invalid email"}),

    password: z.string({
        required_error: "Password is required"
    }).regex(passwordRegex, { message: "Invalid password." })
})
