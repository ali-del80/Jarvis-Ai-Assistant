
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
connectDB();

app.get('/',(req,res)=>{
    res.send("Welcome to Jarvis AI Assistant API");
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})