
import Blogs from "../schemas/Blog.js"
import Users from "../schemas/Users.js"
import { deletImages } from "../utils/deleteImages.js"
import { makeSlug } from "../utils/slug.js"

export const createBlog = async (req, res, next) => {
    try {
        console.log(req.files);
        const images = req.files.map(file => file.filename)
        console.log(images);

        console.log(req.body);
        const slug = makeSlug(req.body?.title)

        console.log(slug);
        const slugExist = await Blogs.findOne({ slug })

        if (slugExist) {
            deletImages(images)
            return res.status(400).send('Error: Slug already exist');
        }

        const author = await Users.findById(req.body?.author)
        if (!author) {
            deletImages(images)
            return res.status(400).send('Error: Author not found');
        }

        const blog = await Blogs.create({ ...req.body, images, slug })

        res.status(201).send(blog);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}


export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blogs.find()
        res.status(201).send(blogs);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}
export const getBlog = async (req, res, next) => {
    try {

        const slug = req.params?.slug

        console.log(slug);
        const blog = await Blogs.findOne({slug}).populate("author")
        if (!blog) {
            return res.status(404).send('Error: Blog not found');
        }
        res.status(201).send(blog);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}


export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blogs.findByIdAndDelete(req.params.id)
        if (!blog) {
            return res.status(404).send('Error: Blog not found');
        }

        deletImages(blog.images)

        res.status(200).send('Blog deleted');
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}