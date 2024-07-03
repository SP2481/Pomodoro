import { Request, Response } from 'express'
import * as statusCodes from 'http-status'
import { leaderboard } from '../models/leaderboard.model'

export const updateLeaderboard = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body
        const updatedUser = await leaderboard.findByIdAndUpdate(user_id, { $inc: { total_sessions: 1 } });
        if (!updatedUser) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        return res.status(statusCodes.OK).json(updatedUser);
    } catch (err: any) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
}