import express from 'express';
import { getAllPosts, createPost, updatePost, deletePost, getSinglePost, getPostBaseOnVisibility, uploadToCloud } from "../controller/post.js";
const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.post('/new', createPost);
router.get('/:id/:vis', getPostBaseOnVisibility);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);
router.post('/uploadtocloud', uploadToCloud);

export default router;