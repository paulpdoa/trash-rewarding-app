const express = require('express');
const route = express.Router();

const {user_get} = require('../controller/mainController');

route.get('/user', user_get);

module.exports = route;