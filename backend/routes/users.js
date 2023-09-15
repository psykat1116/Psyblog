import express from 'express';
const router = express.Router();
import { updateUserData, getUserData } from '../controller/user.js';

router.put('/update/:field', updateUserData);
router.get('/getUser', getUserData);

export default router;