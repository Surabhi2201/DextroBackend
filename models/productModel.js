import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
     phoneNumber:{
        type:Number,
        required:true
    }, 
    price:{
        type:Number,
        required:true
    },
     category:{
        type:String,
        required:true
    }

})