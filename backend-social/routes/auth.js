import express from "express";
// whole file methods can be accessed using ../../auth.js
import auth from "../controllers/auth.js";

// else for separate withdrawal of the methods grab the method name without .js extension
// import register from "../controllers/auth";
// import login from "../controllers/auth";

// register, login will need to kept here but register is not present here it is written in index.js file
const router = express.Router();
// route for the login page
router.post("/login",auth.login);
export default router;
