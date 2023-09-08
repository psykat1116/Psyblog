import express from 'express';
import { getAllPosts, createPost, updatePost, deletePost, getSinglePost } from "../controller/post.js";
const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router;