import { checkRefreshToken } from "../config/generateToken.js";

export const validateRefreshToken =(req,res,next)=>{
  const {refreshToken} = req.cookies
  if(!refreshToken) return res.status(401).json({message: "No token, authorization denied."})
    const verified = checkRefreshToken(refreshToken)
    if(!verified) return res.status(401).json({message: "Invalid token."})
    req.user = verified; //i create user on the req object, so it can go to the next in the route.
    next();
}