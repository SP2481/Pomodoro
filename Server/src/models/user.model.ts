import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true,

    },
    last_name: {
        type: String, 
        required: true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
       type: String,
        required: true,
        minlength: 6,
    }, 
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    },
    resetPasswordToken: {
        type:String, 
        default:undefined
    },
    resetPasswordExpiry: {
        type:Number,
        default:undefined
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})
export const User = mongoose.model('User', userSchema)