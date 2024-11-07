import  mongoose from 'mongoose';



const BlogSchema =  new mongoose.Schema(
{
    title : {
        type : mongoose.SchemaTypes.String,
        required : true
    } ,
    slug : {
        type : mongoose.SchemaTypes.String,
        required : true,
        unique : true,
        lowercase: true,
        // match: /^[a-zA-Z0-9]+$/,
        index: true,
    } ,
    blog : {
        type : mongoose.SchemaTypes.String,
        required : true
    } ,

    images: {
        type: [mongoose.SchemaTypes.String],
        default: [],
        required: true,
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    } ,

} ,
{
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
} )


const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;