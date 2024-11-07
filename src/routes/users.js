import express from 'express';
import {getAllUsers , deleteUser , register , login , updateUser , getOneUser, verify} from '../controller/users.js'
import {isLoggedIn}  from "../auth/IsloggedIn.js"

const router = express.Router();



router.post('/register' , register)
router.post('/login' , login)
router.get('/verify' , isLoggedIn , verify)


router.get('/' ,  getAllUsers)
router.get('/:id' ,  getOneUser)


router.patch('/' ,  updateUser)
router.delete('/' ,  deleteUser)





export default router