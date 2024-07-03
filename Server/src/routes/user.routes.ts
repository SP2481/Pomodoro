import { Router } from "express";
import { forgotPassword, getAllUser, login, resetPassword } from "../controller/user.controller";

class UserRoutes {
    router = Router();
    constructor(){
        this.routes()
    }
    routes (){
        this.router.post('/login',login);
        this.router.post('/forgotPass', forgotPassword)
        this.router.post('/reset-password/:token', resetPassword)
        this.router.get('/', getAllUser)
    }
}
export default new UserRoutes().router;