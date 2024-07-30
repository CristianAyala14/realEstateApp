import {z} from "zod";

export const singUpSchema = z.object({

    username: z.string({
        required_error: "Username is required."
    }).min(4,{message: "Usernamed is too short."}),
    
    email: z.string({
        required_error:"Email is required."}).email({
        message: "Invalid email."
    }),

    password: z.string({
        required_error: "Password is required." 
    }).min(6, {message: "Password must be at least 6 characters."})

}) 


export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required."
    }).email({message: "Invalid email."}),

    password: z.string({
        required_error: "Password is required."
    })
})
