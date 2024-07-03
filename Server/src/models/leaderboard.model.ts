import mongoose from "mongoose";

const leaderboardSchema = new  mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    total_sessions: {
        type: Number,
        required: true
    }
})

export const leaderboard = mongoose.model('Leaderboard', leaderboardSchema)