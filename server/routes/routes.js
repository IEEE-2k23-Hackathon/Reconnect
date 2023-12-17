const express = require("express");
const Register = require("../controllers/Register");
const Login = require("../controllers/Login");
const Logout = require("../controllers/Logout");
const UserController = require("../controllers/UserController");
const Verifytoken = require("../middlewares/verifyAuth");
const {getUser} = require("../controllers/getUser");
const addTask = require("../controllers/addTasks");
const getTasks = require("../controllers/getTasks");
const {addBlog,getBlogs} = require("../controllers/uploadBlog");
const route = express.Router();

//Post Requests
route.post("/register", Register);
route.post("/login", Login);
route.post("/logout", Verifytoken, Logout);
route.post('/addTask',addTask);
route.post('/uploadBlog',addBlog)

//Get Requests
route.get("/getEverything", UserController.GetAllUserData);
route.get("/getUserDetails",Verifytoken,getUser);
route.get("/addictTasks",getTasks);
route.get("/getBlogs",getBlogs)
module.exports = route;
