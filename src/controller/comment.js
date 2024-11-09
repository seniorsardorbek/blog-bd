import Comment from "../schemas/Comment.js"
import User from "../schemas/Users.js"
import Blog from "../schemas/Blog.js"
export const get = async (req, res, next) => {
    try {

        const blog = req.params?.blogId
        const comments = await Comment.find({blog}).populate('user')
        res.status(200).send(comments)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const post = async (req, res, next) => {
    try {
        console.log(req.user);
        const { id, role } = req.user  ||{}


        if (role === 'admin') {
            return res.status(403).send('Error: You are not authorized to create comments')
        }

        const user =  await User.findById(id)
        if (!user) {
            return res.status(404).send('Error: User not found')
        }

        const blog = await Blog.findById(req.body?.blog)

        if (!blog) {
            return res.status(404).send('Error: Blog not found')
        }



        const createComment = await Comment.create({ ...req.body , user : id })
        res.status(201).send(createComment)
    } catch (error) {
        res.status(500).send(error.message)
    }
}