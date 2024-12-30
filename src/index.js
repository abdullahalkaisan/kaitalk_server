import express from 'express';

import {connectDB} from "./lib/db.js";


import cors from 'cors';

import authRoutes from "./routes/auth.router.js";
import messageRoutes from "./routes/message.router.js";
import userRoutes from "./routes/user.router.js";
import followRoutes from "./routes/follow.router.js";

import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


// app.use(cors());

// app.use(cors({
//     origin: ["justtest-a94bf.firebaseapp.com","http://localhost:5173" ],
//     credentials:true,
//     "Access-Control-Allow-Credentials":true
// }));


app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
    // "Access-Control-Allow-Credentials":true
}));



// app.use(cors({
//     origin: true,
//     credentials:true,
//     "Access-Control-Allow-Credentials":true
// }));





app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

app.use('/api/users', userRoutes)

app.use('/api/following', followRoutes)



app.listen(5001, ()=>{
    console.log("server is running on port", PORT);
    connectDB();
});

