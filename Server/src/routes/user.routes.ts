import { Router } from "express";
import { forgotPassword, login, resetPassword, SignUp, verifyUser } from "../controller/user.controller";
import { authMiddleware } from '../middleware/authMiddleware';

class UserRoutes {
    router = Router();
    constructor(){
        this.routes()
    }
    routes (){
        this.router.post('/login',login);
        this.router.post('/signup',SignUp);
        this.router.post('/forgotPass', forgotPassword)
        this.router.post('/reset-password/:token', resetPassword)
        this.router.get('/verify-user', authMiddleware, verifyUser)
        this.router.get('/', (req, res) => {
    res.send('User route working');
})
    }
}
export default new UserRoutes().router;