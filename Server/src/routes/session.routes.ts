import { Router } from "express";
import { createSession, getAllSessions } from "../controller/session.controller";
import { authMiddleware } from '../middleware/authMiddleware';

class SessionRoutes {
    router = Router();
    constructor(){
        this.routes()
    }
    routes(){
        this.router.post('/',authMiddleware,createSession)
        this.router.get('/',authMiddleware,getAllSessions)
    }
}
export default new SessionRoutes().router;