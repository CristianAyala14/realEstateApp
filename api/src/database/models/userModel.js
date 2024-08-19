import mongoose from "mongoose";

const collection = "user"
const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      trim: true //limpia espacios cuando se cargue el dato
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profileImage: {
      type: String, // Almacena la URL o path de la imagen
      default: "https://muytecnologicos.com/wp-content/uploads/2023/04/Autenticacion-de-usuario.png"
    }
    

}, {timestamps:true})

const userModel = mongoose.model(collection, userSchema)
export default userModel;