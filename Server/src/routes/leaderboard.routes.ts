import { Router } from "express";
import { getLeaderboard } from '../controller/leaderboard.controller';
import { authMiddleware } from '../middleware/authMiddleware';

class LeaderBoardRoutes {
    router = Router();
    constructor(){
        this.routes()
    }
    routes(){
        this.router.get('/',authMiddleware, getLeaderboard )
    }
}
export default new LeaderBoardRoutes().router;