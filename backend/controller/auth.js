import { db } from '../dbconfig.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

db.connect((err) => {
    if (err) {
        throw new Error(err);
    }
    console.log("Connected to database");
})

export const register = async (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR name = ?";
    db.query(q, [req.body.email, req.body.name], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: err, success: false });
        }
        if (result.length) {
            return res.status(409).json({ message: "User already exists" });
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);

        const q = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
        const values = [
            req.body.name,
            req.body.email,
            hashPassword
        ]
        db.query(q, [values], async (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            return res.status(201).json({ message: "User created" });
        });
    });

}

export const login = async (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        if (!result.length) {
            return res.status(401).json({ isAuth: false, message: "Invalid email or password" });
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, result[0].password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ isAuth: false, message: "Invalid email or password" });
        }
        const { password, ...others } = result[0];
        const token = jwt.sign({ email: result[0].email, id: result[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ others, token: token });
    });
}

export const logout = (req, res) => {
    res.status(200).json({ message: "Logged out" });
}