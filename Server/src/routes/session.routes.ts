import { Router } from "express";
import { createSession } from "../controller/session.controller";

class SessionRoutes {
    router = Router();
    constructor(){
        this.routes()
    }
    routes(){
        this.router.post('/',createSession)
    }
}
export default new SessionRoutes().router;