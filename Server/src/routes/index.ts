import { Application } from "express";
import sessionRoutes from "./session.routes";
import userRoutes from './user.routes';
import leaderboardRoutes from './leaderboard.routes';

export default class Routes {
    constructor(app:Application){
        app.use('/user',userRoutes)
        app.use('/session',sessionRoutes)
        app.use('/leaderboard', leaderboardRoutes)
    }
}