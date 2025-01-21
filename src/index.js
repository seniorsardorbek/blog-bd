import express from 'express';
import { db } from './db/index.js';
import blogsRouter from './routes/blogs.js';
import usersRouter from './routes/users.js';
import commentRouter from './routes/comment.js';
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express();


app.use(cookieParser());

app.use(
    cors({
      origin: 'http://localhost:5173', // Replace with your React app's URL
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
  );

  
app.use(express.static('uploads'))
app.use(express.json())



app.use('/users'  , usersRouter )
app.use('/blogs' , blogsRouter)
app.use('/comments' , commentRouter)


app.get('/' , function(req, res) {
    res.send('Hello World!');
})

db()
app.listen(3000 , () => {
  
    console.log('Server is running on port 4000');
})