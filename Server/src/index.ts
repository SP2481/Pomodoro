import express from 'express';
import './config/dotenv'
import { mongo } from './config/db';
import Routes from './routes';

const app = express()
app.use(express.json());

mongo;

new Routes(app)

app.listen(process.env.PORT ?? "3000", () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})