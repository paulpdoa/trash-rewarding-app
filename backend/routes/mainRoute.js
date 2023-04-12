const express = require('express');
const route = express.Router();
const { upload } = require('../middleware/uploadMiddleware');

const {user_get, user_post, user_login, user_logout, user_detail_get, 
   user_verify, comment_get, comment_post, user_resend_verification, user_forgot_password,
   user_update_password} = require('../controller/mainController');

// User Routes
route.get('/user', user_get);
route.get('/userlogout',user_logout);
route.get('/userdetailget/:id',user_detail_get);
route.post('/forgotpassword',user_forgot_password);
route.post('/user', upload.single('avatar'), user_post);
route.post('/userlogin',user_login);
route.post('/userresendverification/:id',user_resend_verification);
route.patch('/userverify/:id',user_verify);
route.patch('/userupdatepassword/:id',user_update_password)

// Comment Routes
route.get('/comment',comment_get);
route.post('/comment',comment_post);


module.exports = route;