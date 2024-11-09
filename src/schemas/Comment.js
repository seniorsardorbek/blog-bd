import mongoose from 'mongoose';



const commentSchema = new mongoose.Schema({
    text: {
        type: mongoose.SchemaTypes.String,
        required: true,
    } ,

    user :{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    } ,
    blog : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Blog",
        required: true,
    }

} , {
    versionKey: false,
    timestamps: {
        createdAt: 'sended',
        updatedAt: false,
    }
})




const Comment = mongoose.model("Comment", commentSchema)


export default Comment