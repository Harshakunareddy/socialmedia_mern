import users from "../controllers/users.js";
import express from "express";
import verifyToken from "../middleware/auth.js";
const router = express.Router();
/*
getUser, => id as req.params
getUserFriends, =>  id as req.params
addRemoveFriend => id as req.params
*/

// here only single person details are grabbing so only "/:id"
router.get("/:id", verifyToken,users.getUser);

router.get("/:id/friends",verifyToken,users.getUserFriends);

// router.get("/:id/patchFriend",users.addRemoveFriend);
// in this case we have to id's grabbing from req.params
// so "/:id/:friendId" giving two id's respetively
router.patch("/:id/:friendId",verifyToken,users.addRemoveFriend);

export default router;