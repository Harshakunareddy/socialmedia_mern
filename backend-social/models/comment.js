// const mongoose = require('mongoose');
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  user: String, // You can extend this to include user information or user references
  timestamp: { type: Date, default: Date.now },
  // Add a reference to the post or item these comments belong to
  postId: mongoose.Schema.Types.ObjectId,
});

const Comment = mongoose.model('Comment', commentSchema);

// module.exports = Comment;
export default Comment;