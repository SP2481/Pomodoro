import { Request, Response } from 'express';
import * as statusCodes from 'http-status';
import { leaderboard } from '../models/leaderboard.model';
import { User } from '../models/user.model';
import { ResponseBuilder } from '../utils/response.builder';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getLeaderboard = async (req: Request, res: Response) => { 
    try {
        // Extract user information from request headers
        const userObject = JSON.parse(req.headers['user'] as string);
        const user = await User.findOne({ email: userObject.email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get the entire leaderboard sorted by total_sessions in descending order
        const allLeaderBoard = await leaderboard.find().sort({ total_sessions: -1 });

        // Add rank to each entry
        const leaderboardWithRanks = allLeaderBoard.map((entry, index) => ({
            user_id: entry.user_id,
            total_sessions: entry.total_sessions,
            rank: index + 1
        }));

        // Find the user's rank
        const userRank = leaderboardWithRanks.find(entry => entry.user_id.toString() === user._id.toString());
        // Respond with the user's rank and the entire leaderboard 
        const response = ResponseBuilder({ userRank: userRank, leaderboard: leaderboardWithRanks }, statusCodes.OK)
        res.status(200).send(response);
    } catch(err:any) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
}