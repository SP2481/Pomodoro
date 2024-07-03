import { ResponseBuilder } from './../utils/response.builder';
import { Request, Response, json } from 'express'
import { Session } from '../models/sessions.model';
import * as statusCodes from 'http-status'
import { leaderboard } from '../models/leaderboard.model';

export const createSession = async(req:Request, res:Response) => {
    try{
        const { label, end_time } = req.body
        const user  = req.headers['user'] as string
        const parsedUser = JSON.parse(user) 
        await Session.create({ user_id: parsedUser.user_id, label, end_time})
        const response = ResponseBuilder('success', statusCodes.CREATED)
        res.status(200).send(response)
    }catch(err:any){
        return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
}

export const updateSession = async (req:Request, res:Response) => {
    try{
        const { curr_time, user_id, label } = req.body;
        const session = await Session.findById(user_id);
        const isCompleted = curr_time === session?.end_time;
        await Session.updateOne(user_id, { $set:{ label: label, is_completed: isCompleted ? true :false } })
        await leaderboard.create({user_id, total_sessions: 1})
        const response = ResponseBuilder('success', statusCodes.OK)
        res.status(200).send(response)
    }catch(err:any){
        return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
}