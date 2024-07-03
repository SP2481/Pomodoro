import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    label:{
        type:String,
    },
    end_time: Date,
    is_completed:  {
        type:Boolean,
        default:false
    },
    created_at: {
        type:Date,
        default:Date.now()
    },
    updated_at: {
        type:Date,
        default:Date.now()
    }
})

export const  Session = mongoose.model('Session',sessionSchema) 