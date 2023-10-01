import express from "express";
import posts from "../controllers/posts.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

// here no req.params so directly putting "/" only 
router.get("/",verifyToken,posts.getFeedPosts);

// where ever we have the req.params , there 
// we need to give the "/:id/like" or "/:userId/like" or "/:id/comment" 
router.get("/:userId/posts",verifyToken,posts.getUserPosts);
router.patch("/:id/like",verifyToken,posts.likePost);

// comments
// router.put("/:id/comment",verifyToken,posts.createComment);
// router.get("/:id/comment/show",verifyToken,posts.getComments);

export default router;