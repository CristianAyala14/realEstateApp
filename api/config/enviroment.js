import dotenv from "dotenv";
import {Command} from "commander";
import __dirname from "./___dirname.js";
import path from "path";

//commander config
const program = new Command();
program.option("-mode <mode>", "Init mode", "dev")
program.parse()
const enviroment = program.opts();
const pathEnviroment= enviroment.Mode === "prod"? path.join(__dirname, "../.env.prod") : path.join(__dirname, "../.env.dev")

//dotenv config
dotenv.config({path:pathEnviroment})

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