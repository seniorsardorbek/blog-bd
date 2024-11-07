import express from 'express';
import { db } from './db/index.js';
import blogsRouter from './routes/blogs.js';
import usersRouter from './routes/users.js';
import cors from 'cors'
const app = express();



app.use(cors())
app.use(express.static('uploads'))
app.use(express.json())



app.use('/users'  , usersRouter )
app.use('/blogs' , blogsRouter)

db()
app.listen(4000 , () => {
    console.log('Server is running on port 4000');
})