import jwt from "jsonwebtoken";
import { envObject } from "../config/enviroment.js"

export const generateToken = (user) => {
  let token = jwt.sign(user, envObject.jwt.key, {expiresIn: "1d"} )
  return token
}

export const verifyToken = (token) => {
  const tokenVerified = jwt.verify(token, envObject.jwt.key)
  return tokenVerified;
}
