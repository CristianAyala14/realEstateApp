import jwt from "jsonwebtoken";
import { envObject } from "../config/enviroment.js"

export const genAccessToken = (user) => {
  let token = jwt.sign(user, envObject.accessjwt.key, {expiresIn: "15m"} )
  return token
}

export const checkAccessToken = (token) => {
  const tokenVerified = jwt.verify(token, envObject.accessjwt.key)
  return tokenVerified;
}

export const genRefreshToken = (user) => {
  let token = jwt.sign(user, envObject.refreshjwt.key, {expiresIn: "12h"} )
  return token
}

export const checkRefreshToken = (token) => {
  const tokenVerified = jwt.verify(token, envObject.refreshjwt.key)
  return tokenVerified;
}
