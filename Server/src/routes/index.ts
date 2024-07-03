import { Application } from "express";
import userRoutes from './user.routes';
import sessionRoutes from "./session.routes";

export default class Routes {
    constructor(app:Application){
        app.use('/user',userRoutes)
        app.use('/session',sessionRoutes)
    }
}