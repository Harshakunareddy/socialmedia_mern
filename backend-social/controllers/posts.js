/* 
need to create and export
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    commentPost,
*/

import Post from "../models/Post.js";
import User from "../models/User.js";

const createPost = async (req, res) => {
  try {
    // from the frontend pick the userId, description and the picturePath
    const { userId, description, picturePath } = req.body;
    // pick the user by using the userId
    const user = await User.findById(userId);
    // save the post in the mongodb using the userId
    // userId is using because db need to know that at what user space the post need to be saved.
    // so that the retrieval mechanism will be easy.
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,

      // users profile photo
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    // here it is saved in db
    await newPost.save();

    // now retrieve it immediately so that user can see his newly added post live
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// getFeedPosts - taking all the posts and showing them to the user
const getFeedPosts = async (req, res) => {
  try {
    // grabbing all the posts that are present in the mongo Database
    const post = await Post.find();
    // send all the posts to frontend using the json format
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// when we click on one single person then his posts all need to be retrieved.
const getUserPosts = async (req, res) => {
  try {
    // grabbing the userId with req.params of that particular single person
    const { userId } = req.params;
    // grabbing only the single particular users posts

    // check it bro during the running and testing
    // const post = await Post.findById(userId);
    const post = await Post.find({ userId });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// the body that we are currently seeing :
// for grabbing anything from the body that related to this above line
// can be grabbed using the req.body
// and the post id and the user id
// of other people on the mongodb can be grabbed using the req.params
// its like when using the url routing from one part of our application to other part or to the database any operation is persorming

// like functionality
const likePost = async (req, res) => {
  try {
    // login for liking the post
    // if he already liked the post he get the option to unlike the like button
    // and vice versa just like the friend addRemove Friend

    // 1. grab the post id from req.params
    // and user id from the req.body of the person who is watching the post
    const { id } = req.params;
    const { userId } = req.body;

    // grabbing the post by using the id that is taken from the req.params
    const post = await Post.findById(id);

    // var having t/f or 0/1
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      // giving chance to remove the like
      post.likes.delete(userId);
    } else {
      // giving chance to add the like

      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

// comment functionality giving

const createComment = async (req,res)=>{
  try{
    const { id } = req.params;
    // const { userId } = req.body;

    // grabbing the post by using the id that is taken from the req.params
    const post = await Post.findById(id);
    const {commentsMama} = req.body;
    
    const updatedPost = await Post.findByIdAndUpdate(
      
      { comments: post.comments.append(commentsMama) },
      
    );
    res.status(200).json(updatedPost);


  }catch(error){
    res.status(404).json({msg:"comments section controller check ."});
  }
}  

const getComments = async (req,res)=>{
  try{
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(posts.comments);
  }catch(error){
    res.status(404).json({msg:"check the getComments in posts.js controller"});
  }
}

// const showComment = async (req,res)=>{
//   try{

//   }catch(error){
//     res.status(404).json({msg:"check the post controller showComment method"});
//   }
// }
  
export default {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  createComment,
  getComments,
};
