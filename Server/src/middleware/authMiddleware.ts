/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import * as statusCodes from 'http-status';
import { verifyJWT } from "../services/jwt";
import { ResponseBuilder } from "../utils/response.builder";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string = req.headers.accesstoken as string;
        if (!token) {
            const response = ResponseBuilder('Unauthorised request', statusCodes.UNAUTHORIZED)
            res.status(401).send(response);
        } else {
            const verifyToken = await verifyJWT(token);
            if (verifyToken.success) {
                req.headers['user'] = JSON.stringify(verifyToken.data);
                next();
            } else {
                const response = ResponseBuilder('Unauthorised request', statusCodes.UNAUTHORIZED)
                res.status(401).send(response);
            }
        }
    } catch (err: any) {
        const response = ResponseBuilder('Unauthorised request', statusCodes.UNAUTHORIZED)
        res.status(401).send(response);
    }
};
