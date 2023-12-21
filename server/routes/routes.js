const express = require("express");
const Register = require("../controllers/Register");
const Login = require("../controllers/Login");
const Logout = require("../controllers/Logout");
const Verifytoken = require("../middlewares/verifyAuth");
const {getUser} = require("../controllers/getUser");
const addTask = require("../controllers/addTasks");
const getTasks = require("../controllers/getTasks");
const {addBlog,getBlogs} = require("../controllers/uploadBlog");
const  userController = require("../controllers/updateTaskScore");
const updateDailyTaskDone = require("../controllers/updateLevelScore");
const route = express.Router();

//Post Requests
route.post("/register", Register);
route.post("/login", Login);
route.post("/logout", Verifytoken, Logout);
route.post('/addTask',addTask);
route.post('/uploadBlog',addBlog);
route.post('/updateTaskScore/:userId', userController.updateTaskScore);
route.post('/users/updateDailyTaskDone/:userId', updateDailyTaskDone);

//Get Requests
route.get("/getUserDetails",Verifytoken,getUser);
route.get("/addictTasks",getTasks);
route.get("/getBlogs",getBlogs)
module.exports = route;
