import { User } from './../models/user.model';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import * as statusCodes from 'http-status';
import { leaderboard } from '../models/leaderboard.model';
import { Session } from '../models/sessions.model';
import { ResponseBuilder } from './../utils/response.builder';


export const createSession = async (req: Request, res: Response) => {
    try {
        const { label, end_time } = req.body
        const userObject = JSON.parse(req.headers['user'] as any);
        const user: any = await User.findOne({ email: userObject.email })
        if (!user) {
            return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        await Session.create({ user_id: user._id, label: label ?? 'session', end_time })
        const userDoc = await leaderboard.findOne({user_id : user._id});
        if (userDoc) {
            userDoc.total_sessions += 1;
            await userDoc.save();
        }
        const response = ResponseBuilder('success', statusCodes.CREATED)
        res.status(200).send(response)
    } catch (err: any) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
}

export const updateSession = async (req: Request, res: Response) => {
    try {
        const { curr_time, user_id, label } = req.body;
        const session = await Session.findById(user_id);
        const isCompleted = curr_time === session?.end_time;
        await Session.updateOne(user_id, { $set: { label: label, is_completed: isCompleted ? true : false } })

        const response = ResponseBuilder('success', statusCodes.OK)
        res.status(200).send(response)
    } catch (err: any) {
        return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
}

export const getAllSessions = async (req: Request, res: Response) => {
    try {
        const userObject = JSON.parse(req.headers['user'] as any);
        const user: any = await User.findOne({ email: userObject.email });
        const sessions = await Session.find({ user_id: user._id })
        console.log(sessions);
        const response = ResponseBuilder(sessions, statusCodes.OK)
        res.status(200).send(response);
    } catch (err: any) {
        res.status(statusCodes.BAD_REQUEST).json({ message: err.message });

    }
}