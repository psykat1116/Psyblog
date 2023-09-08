import { db } from '../dbconfig.js';
import Jwt from 'jsonwebtoken';

export const getAllPosts = ((req, res) => {
    const q = req.query.catagory ? "SELECT * FROM posts WHERE catagory = ?" : "SELECT * FROM posts";

    db.query(q, [req.query.catagory], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result);
    })
})

export const getSinglePost = ((req, res) => {
    const id = req.params.id;
    const q = "SELECT p.id,`name`,`title`,`description`,u.image as userImg, p.image as image, date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    db.query(q, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result);
    })
})

export const createPost = ((req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You are not Authorized" });
    }
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        const q = "INSERT INTO posts(`uid`,`title`,`image`,`description`,`catagory`,`date`,`lastupdate`,`visibility`) VALUES(?)";
        const value = [userInfo.id, req.body.title, req.body.image, req.body.description, req.body.catagory, req.body.date, req.body.lastupdate, req.body.visibility];

        db.query(q, [value], (error, result) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.json("Post created successfully");
        });
    });
})

export const deletePost = ((req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You are not Authorized" });
    }
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        db.query(q, [postId, userInfo.id], (error, result) => {
            if (error) {
                req.status(403).json({ message: "You are not Authorized" });
            }
            return res.json({ message: "Post deleted successfully" })
        });
    });
})

export const updatePost = ((req, res) => {
    const token = req.cookies.token;
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
            return res.json("Post updated successfully");
        });
    });
})