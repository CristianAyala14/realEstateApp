import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const collection = "listing"
const listingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true //limpia espacios cuando se cargue el dato
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    regularPrice: {
      type: Number, 
      required: true
    },
    discountPrice: {
      type: Number, 
      required: true
    },
    bathrooms:{
      type: Number,
      required: true,
    },
    bedrooms:{
      type: Number,
      required: true,
    },
    furnished:{
      type: Boolean,
      required: true,
    },
    parking:{
      type: Boolean,
      required: true,
    },
    type:{
      type: String,
      required: true,
    },
    offer:{
      type: Boolean,
      required: true,
    },
    imageUrls:{
      type: Array,
      required: true,
    },
    userRef:{
      type: String,
      required: true,
    },
    

}, {timestamps:true})

listingSchema.plugin(mongoosePaginate)

const listingModel = mongoose.model(collection, listingSchema)
export default listingModel;