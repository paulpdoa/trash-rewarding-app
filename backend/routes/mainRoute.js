const express = require('express');
const route = express.Router();

const {user_get, user_post, user_login} = require('../controller/mainController');

// User Routes
route.get('/user', user_get);
route.post('/user', user_post);
route.post('/user',user_login);

module.exports = route;