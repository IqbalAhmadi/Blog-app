import express from 'express'
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
} from '../controllers/post.controller.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/:slug', getPost)
router.post('/', createPost)
router.delete('/:id', deletePost)

// router.get('/saved', getUserSavedPosts)
// router.patch('/save', savePost)

export default router
