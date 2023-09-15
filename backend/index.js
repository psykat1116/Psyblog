import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import userRouter from './routes/users.js';
import cookieParser from 'cookie-parser';
const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));