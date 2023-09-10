import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/uploads");
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "." + extension);
    }
})
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));