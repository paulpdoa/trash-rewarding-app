const express = require('express');
const route = express.Router();

const {user_get, user_post, user_login, user_logout} = require('../controller/mainController');

// User Routes
route.get('/user', user_get);
route.get('/userlogout',user_logout);
route.post('/user', user_post);
route.post('/userlogin',user_login);


module.exports = route;