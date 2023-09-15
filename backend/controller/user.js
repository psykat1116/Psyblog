import { db } from '../dbconfig.js'
import Jwt from 'jsonwebtoken';

export const updateUserData = ((req, res) => {
    const field = req.params.field;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You are not Authorized" });
    }
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        const q = `UPDATE users SET ${field}= ? WHERE id = ?`;
        db.query(q, [req.body.value, userInfo.id], (error, result) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.status(200).json({ message: "User data updated successfully" });
        });
    })
});

export const getUserData = ((req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You are not Authorized" });
    }
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userInfo) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        const q = `SELECT * FROM users WHERE id = ?`;
        db.query(q, [userInfo.id], (error, result) => {
            if (error) {
                return res.status(500).json(error);
            }
            const { password, ...rest } = result[0];
            return res.status(200).json(rest);
        })
    })
});