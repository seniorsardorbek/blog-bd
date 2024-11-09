import express from 'express';
import { upload } from "../utils/multer.js"
import {isLoggedIn} from "../auth/IsloggedIn.js"
import { createBlog, getBlogs , getBlog , deleteBlog } from "../controller/blogs.js"
const router = express.Router();


router.get('/:slug' , isLoggedIn , getBlog)
router.get('/', getBlogs)
router.post('/', upload.array('images') , createBlog)


router.delete('/:id' , deleteBlog)



export default router





