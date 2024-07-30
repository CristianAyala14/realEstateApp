import dotenv from "dotenv";
import __dirname from "./___dirname.js";
import path from "path";


//dotenv config
dotenv.config({path:path.join(__dirname, "../.env.dev")})

//enviroment object
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_KEY = process.env.JWT_KEY

const envObject = {
  server: {
    port: PORT
  },
  mongo: {
    url: MONGO_URL
  },
  jwt: {
    key: JWT_KEY
  }
};

export {envObject};