import { db } from '../dbconfig.js';
import Jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadToCloud = ((req, res) => {
    try {
        const image = req.body.image;
        const opts = {
            overwrite: true,
            invalidate: true,
            resource_type: "auto"
        }
        cloudinary.uploader.upload(image, opts, (err, result) => {
            if (err) console.log(err);
            res.json(result.url);
        });
    } catch (error) {
        console.log(error.message);
    }
});

export const getAllPosts = ((req, res) => {
    const q = req.query.catagory !== undefined ? `SELECT * FROM posts WHERE catagory = ? AND visibility = "public" ` : `SELECT * FROM posts WHERE visibility = "public"`;
    db.query(q, [req.query.catagory], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result);
    })
})

export const getSinglePost = ((req, res) => {
    const id = req.params.id;
    const q = "SELECT p.id,`uid`,`catagory`,`lastupdate`,`visibility`,`name`,`title`,`description`,u.image as userImg, p.image as image, date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    db.query(q, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result);
    })
})

export const getPostBaseOnVisibility = ((req, res) => {
    const uid = req.params.id, vis = req.params.vis;
    const q = "SELECT p.id,`uid`,`catagory`,`lastupdate`,`visibility`,`name`,`title`,`description`,u.image as userImg, p.image as image, date FROM users u JOIN posts p ON u.id = p.uid WHERE p.uid = ? AND p.visibility = ? ";
    db.query(q, [uid, vis], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result);
    });
});

export const createPost = ((req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ message: "You are not Authorized" });
    }
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        const q = "INSERT INTO posts (`uid`,`title`,`image`,`description`,`catagory`,`date`,`lastupdate`,`visibility`) VALUES (?)";
        const value = [userInfo.id, req.body.title, req.body.image, req.body.description, req.body.catagory, req.body.date, req.body.lastupdate, req.body.visibility]
        db.query(q, [value], (error, result) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.status(200).json({ message: "Post created successfully" });
        });
    });
})

export const deletePost = ((req, res) => {
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ?";
    db.query(q, [postId], (error, result) => {
        if (error) {
            req.status(403).json({ message: "You are not Authorized" });
        }
        return res.status(200).json({ message: "Post deleted successfully" })
    });
})

export const updatePost = ((req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ message: "You are not Authorized" });
    }
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        const q = "UPDATE posts SET `title` = ?, `description` = ?, `catagory` = ?, `visibility` = ?, `lastupdate` = ? WHERE `id` = ? AND `uid` = ?";

        db.query(q, [req.body.title, req.body.description, req.body.catagory, req.body.visibility, req.body.lastupdate, req.params.id, userInfo.id], (error, result) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.status(200).json({ message: "Post updated successfully" });
        });
    });
})