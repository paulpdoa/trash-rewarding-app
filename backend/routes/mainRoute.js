const express = require('express');
const route = express.Router();
const { upload } = require('../middleware/uploadMiddleware');

const { user_get, user_post, user_login, user_logout, user_detail_get, 
   user_verify, comment_get, comment_post, user_resend_verification, user_forgot_password,
   user_update_password, admin_approve_user, admin_reject_user, admin_delete_user, admin_post, 
   admin_get, admin_login, admin_logout, category_get, user_receive_points, user_receive_rewards, 
   reward_get, user_point_get, user_point_detail_get, user_reward_detail_get, collection_get, collection_report, add_rewards, delete_reward, reward_detail_get } = require('../controller/mainController');

// User Routes
route.get('/user', user_get);
route.get('/userlogout',user_logout);
route.get('/userdetailget/:id',user_detail_get);
route.get('/userpoints', user_point_get);
route.get('/userpointdetail/:id',user_point_detail_get);
route.get('/userrewarddetailget/:id',user_reward_detail_get);
route.post('/forgotpassword',user_forgot_password);
route.post('/user', upload.fields([{ name: 'avatar' ,maxCount: 1 }, { name: 'idCard', maxCount: 1 }]), user_post);
route.post('/userlogin',user_login);
route.post('/userresendverification/:id',user_resend_verification);
route.patch('/userverify/:id',user_verify);
route.patch('/userupdatepassword/:id',user_update_password)
route.patch('/userreceivepoint/:id',user_receive_points);
route.patch('/userreceivereward/:id',user_receive_rewards);

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

// Reward Routes
route.get('/rewards', reward_get);
route.get('/reward/:id',reward_detail_get);
route.post('/rewards',upload.single('rewardImage'), add_rewards);
route.delete('/reward/:id', delete_reward);
route.patch('/reward/:id',);

// Collection Routes
route.get('/collections',collection_get);
route.post('/collections',collection_report);

module.exports = route;