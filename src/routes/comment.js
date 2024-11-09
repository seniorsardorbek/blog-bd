import express from 'express';
import { get, post } from "../controller/comment.js"
import {isLoggedIn} from "../auth/IsloggedIn.js"
const router = express.Router();




router.get('/:blogId',  get)
router.post('/', isLoggedIn ,  post)

export default router