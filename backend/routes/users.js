import express from 'express';
const router = express.Router();
import {updateUserData} from '../controller/user.js';

router.put('/update/:field',updateUserData);

export default router;