// const express = require('express');
import express from "express";

const router = express.Router();
import Comment from '../models/Comment.js';
import verifyToken from "../middleware/auth.js";

// Create a new comment
router.post('/', verifyToken,async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating comment' });
  }
});

// Get comments for a specific post or item
router.get('/:postId',verifyToken, async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

// Update a comment by ID
router.put('/:commentId', verifyToken,async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Error updating comment' });
  }
});

// Delete a comment by ID
router.delete('/:commentId', verifyToken,async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.commentId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
});

export default router;
// module.exports = router;
