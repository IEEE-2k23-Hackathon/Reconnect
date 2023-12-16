const express = require('express');
const Register = require('../controllers/Register');
const Login = require('../controllers/Login');
const Logout = require('../controllers/Logout');
const Verifytoken = require('../middlewares/verifyAuth');
const route = express.Router();

//Post Requests
route.post('/register',Register);
route.post('/login',Login);
route.post('/logout',Verifytoken,Logout);

//Get Requests

module.exports = route;
