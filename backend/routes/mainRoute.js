const express = require('express');
const route = express.Router();

const {user_get, user_post} = require('../controller/mainController');

route.get('/user', user_get);
route.post('/user', user_post);

module.exports = route;