import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        // key-value pairs of having type of boolean in this case 
        // and the value can be of any datatype no matter what it is. 
        type: Map,
        of: Boolean
    },
    // comments: {
    //     type: Array,
    //     default: [],
    // }
} , { timestamps: true } ); 
const Post = mongoose.model("Post",postSchema);
export default Post;