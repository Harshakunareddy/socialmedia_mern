
// 1. models - done 
// 2. middleware - done
// 3. controllers - done
// 4. routes - done
// 5. run the app - done 



//  1.  M-V-C are there to follow

//  2.  M - models : where we have the schemas and export them

//  3.  V - views : where we need to write the templates related information like .ejs or the html files
 

//  4.  C - Controllers : where we need to write the code for functions or methods
//                        that are executed in our application
//                        like, the logic for what need to be done
//                        or like, the CRUD operations that are done related to our dataBases
//                        or etc operations with any kind of databases like sql , mysql , firebase , mongodb , agora etc
//

//  5.  Routers : here we need to specify that what function need to be executed when clicking on any
//                button or link :
//                1.    we need to import the controller name and then the route giving along with the
//                      function name like ControllerName.FunctionName
//                2.    and also the const router = Router.express();
//                3.    and also provide what operation we need to give like the post, get, patch, etc
//                4.    like this router.post("/:id/:friendId",ControllerName.FunctionName);

// index.js     : generally we can write the whole controllers and the routers in this file 
//                only but for big projects we can elaborate them as separate folders




import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";

// configurations
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// parsing the incoming payload in http req's as req.body
// parses the json data into req.body and make it available for routing
app.use(express.json());

// to provide security by setting http-headers
app.use(helmet());

// http headers - play crucial role in communication b/w server and client
//                and also provide Authentication,caching,etc
//                types : 
//                req headers - Authorization,Cookie,Content-Type,Referer,Accept etc
//                res headers - Status, Location, Content-Type, Content-length, cache-control, set-cookie, server
//                and comman security headers like
//                csp,hsts etc

// caching      : to store and reuse previously fetched data ,which will improves the performance and reduces the server load and speed up the loading of web pages. ex: browsers caches the images, js files and even entire web page so that whenever user entered into the web page fast response 

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// middleware that provides a convienent way to capture capture information about incoming http requests like execution time and url, status of res and also used for monitoring and debugging web apps
 app.use(morgan("common"));
//  app.use(morgan("dev")); and etc like combined tiny and short and custom too.



// parsing      - process of analyzing and interpretting the structured data like text document or json formatted code 
// body-parser  - middleware that handles http req and parse their data ex: forms and json etc
//                it simplifies the process of parsing and decoding the req stream of data
//                and populate req.body object with the parsed data 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/assets",express.static(
    path.join(__dirname,"public/assets")
    ));

// files storing
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "public/assets");
        // cb(null, "public/assets");
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    },
});
const upload = multer({storage});


// here we need to implement the remaining methods
//  register from the auth controller 
import auth from "./controllers/auth.js";
app.post("/auth/register",upload.single("picture"),auth.register);

// and the createPost from the posts controller
// import createPost from "./controllers/posts";
import posts from "./controllers/posts.js";
import verifyToken from "./middleware/auth.js";
app.post("/posts",verifyToken, upload.single("picture"), posts.createPost);


import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
// taking the all routers and using them in our application
app.use("/auth",authRoutes);  
app.use("/users",userRoutes);

// here it is same as the createPost route in the above lines of code so please check while running 
app.use("/posts",postRoutes);  

// comments
// const commentRoutes = require("./routes/comments.js");
import router from "./routes/comment.js";
app.use('/comments', router);



// mongoose setup
// const PORT =
// MONGODB_URL = "mongodb+srv://kunareddyharshareddy:qwertyuiop@cluster0.aau5hyg.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect("mongodb://127.0.0.1/social",{
mongoose.connect( "mongodb+srv://kunareddyharshareddy:qwertyuiop@cluster0.aau5hyg.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
let db = mongoose.connection
db.on("error",(err)=>{console.log("check the connection")});
db.on("open",()=>{console.log("db connected")});


app.listen(3001,()=>{
    console.log("running express at 3001");
});















