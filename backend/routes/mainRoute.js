const express = require('express');
const route = express.Router();

const {user_get, user_post, user_login, user_logout, user_detail_get, 
    comment_get, comment_post} = require('../controller/mainController');

// User Routes
route.get('/user', user_get);
route.get('/userlogout',user_logout);
route.get('/userdetailget/:id',user_detail_get);
route.post('/user', user_post);
route.post('/userlogin',user_login);

// Comment Routes
route.get('/comment',comment_get);
route.post('/comment',comment_post);


module.exports = route;