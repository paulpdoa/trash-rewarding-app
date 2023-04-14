const express = require('express');
const route = express.Router();
const { upload } = require('../middleware/uploadMiddleware');

const {user_get, user_post, user_login, user_logout, user_detail_get, 
   user_verify, comment_get, comment_post, user_resend_verification, user_forgot_password,
   user_update_password,
   admin_approve_user, admin_reject_user, admin_delete_user, admin_post, admin_get, admin_login, admin_logout, category_get, user_receive_points} = require('../controller/mainController');

// User Routes
route.get('/user', user_get);
route.get('/userlogout',user_logout);
route.get('/userdetailget/:id',user_detail_get);
route.post('/forgotpassword',user_forgot_password);
route.post('/user', upload.fields([{ name: 'avatar' ,maxCount: 1 }, { name: 'idCard', maxCount: 1 }]), user_post);
route.post('/userlogin',user_login);
route.post('/userresendverification/:id',user_resend_verification);
route.patch('/userverify/:id',user_verify);
route.patch('/userupdatepassword/:id',user_update_password)
route.patch('/userreceivepoint/:id',user_receive_points);

// Comment Routes
route.get('/comment',comment_get);
route.post('/comment',comment_post);

// Admin Routes

route.get('/admin',admin_get);
route.get('/adminlogout',admin_logout);
route.post('/admin',admin_post);
route.post('/adminlogin',admin_login);
route.post('/adminrejectuser',admin_reject_user);
route.patch('/adminapproveuser/:id',admin_approve_user);
route.delete('/admindeleteuser/:id',admin_delete_user);

// Category Routes
route.get('/category',category_get);

module.exports = route;