/* eslint-disable @typescript-eslint/no-explicit-any */
import argon2 from 'argon2';
import { Request, Response } from "express";
import * as StatusCodes from 'http-status';
import nodemailer from 'nodemailer';
import { leaderboard } from '../models/leaderboard.model';
import { User } from "../models/user.model";
import { genrateJWT } from "../services/jwt";
import { ResponseBuilder } from "../utils/response.builder";
import { hashPassword } from './../utils/common/hashPassword';

export const login = async (req:Request, res:Response) => {
    try{
        const { email, password } = req.body;
        console.log(req.body,'body')
        if(!email || !password){
            throw new Error(`Invalid email or password, ${email}`);
        }

        const user = await User.findOne({email})
        if(!user) {
            const hashedPassword:string = await hashPassword(password);

            const createUser = await User.create({email, password: hashedPassword})
            await leaderboard.create({ user_id: createUser._id, total_sessions: 0})
            const token = await genrateJWT({email, role:'user'})
            const response = ResponseBuilder({token, email, role:createUser.role},StatusCodes.CREATED )
            return res.status(201).send(response);
        }

        const isPasswordValid = await argon2.verify(user.password, password)
        if(!isPasswordValid){
            throw new Error('Invalid password')
        }
        
        const token = await genrateJWT({email, role:'user'})
        const response = ResponseBuilder({ token, email, role: user.role }, StatusCodes.OK);
        res.cookie('accesstoken', token,{expires: new Date(Date.now() + 90000000) })
        return res.status(StatusCodes.OK).send(response);

    }catch(err:any){
        console.log(err.message)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try{
        const { email } = req.body;

        const user = await User.findOne({email});
        
        if(!user){
            throw new Error('Invalid email')
        }

        const transport = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user:process.env.EMAIL as string,
                pass:process.env.EMAIL_PASSWORD as string
            }
        })

          // Generate a reset token and expiration time
        const token = crypto.randomUUID();
        const expires = Date.now() + 3600000; 

        user.resetPasswordToken = token;
        user.resetPasswordExpiry = expires;
        await user.save();

        const options = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password',
            text: `Please click on the following link to reset your password :- ${process.env.URL}reset-password/${token}`
        }

        transport.sendMail(options, (err) => {
            if (err) {
                console.log(err.message);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error sending email' });
            } else {
                const response = ResponseBuilder('Email sent successfully', StatusCodes.OK);
                return res.status(StatusCodes.OK).send(response);
            }
        });

    }catch(err:any){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }   
}

export const resetPassword = async (req:Request, res:Response) => {
    try{
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() }
        })
        if(!user){
            return res.status(400).send('Password reset token is invalid or has expired');
        }
        
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        user.resetPasswordExpiry = undefined,
        user.resetPasswordToken = undefined;
        await user.save();

        const response = ResponseBuilder('Password reseted succesfully', StatusCodes.OK)
        res.status(200).send(response);
    }catch(err:any){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
}

export const verifyUser = async(req:Request, res:Response) => {
    try {
        const userObject = JSON.parse(req.headers['user'] as string);
        const user = await User.findOne({ email: userObject.email });
        if(!user) {
            throw new Error('user not found');
        }
        console.log(user, 'user')
        const response = ResponseBuilder(user, StatusCodes.OK)
        res.status(200).send(response);
    } catch (err:any) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
}

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).select('-password');
        const response = ResponseBuilder(users, StatusCodes.OK);
        return res.status(StatusCodes.OK).send(response);
    } catch (err: any) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
}