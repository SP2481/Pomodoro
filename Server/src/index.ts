import cors from 'cors';
import express from 'express';
import { mongo } from './config/db';
import './config/dotenv';
import Routes from './routes';

const app = express()
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
mongo;

new Routes(app)

app.listen(process.env.PORT ?? "3001", () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})