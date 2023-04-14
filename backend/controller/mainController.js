const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require("../model/User");
const Comment = require("../model/Comment");
const Admin = require('../model/Admin');
const Category = require('../model/Category');

const maxAge = 3 * 24 * 24 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    let errors = { email: '', password: '',username: '' };

    if(err.message === 'Incorrect password') {
       errors.password = 'Password is incorrect';
    }
    if(err.message === 'This email doesn\'t exist') {
        errors.email = 'Email is incorrect';
    }
    if(err.message === 'This username doesn\'t exist') {
        errors.email = 'Username is incorrect';
    }

    return errors;
}

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_ACCOUNT, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
    }
});

module.exports.user_get = async (req,res) => {
    try {
        const users = await User.find().populate('approvedBy');
        res.status(201).json(users);
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_post = async (req,res) => {

    const { firstName,lastName,middleName,dateOfBirth, password, email, province, barangay, city } = req.body;
    //const { filename } = req.files;
    const avatar = req.files['avatar'][0].filename;
    const idCard = req.files['idCard'][0].filename;

    const code = Math.floor(Math.random() * 100000);
    const userType = 'user';
    const status = false;
    const adminApproved = false;

    const htmlContent = `
    <h1>Hello ${firstName} ${lastName}</h1>
    <p>Here is your code: <b>${code}</b></p>

    <p>Thank you for registering!</p>
    `;

    try {
        const newUser = await User.create({ firstName,lastName,middleName,dateOfBirth, password, email, province, barangay, city, code, userType, status, profilePicture: avatar,adminApproved,idCard });
        const info = await transporter.sendMail({
            from: `'Trash Reward App' <${process.env.MAIL_ACCOUNT}>`,
            to: `${email}`,
            subject: 'Account verification',
            html: htmlContent
        });
        
        console.log(info.response);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
        res.status(201).json({mssg: 'Please check your email for verification, thank you.', redirect: `/verify/${newUser._id}`})
       
       
    } catch(err) {
        if(err.code === 11000) {
            res.status(400).json({mssg: 'This email is already in use, please choose another email'});
        }
    }   
}

module.exports.user_login = async (req,res) => {
    const { email, password } = req.body;

    User.findOne({email})
    .then((name) => {
       if(name) {
        if(name.userType === 'user') {
            if(name.status && name.adminApproved) {
                User.login(email,password)
                .then((user) => {
                    const token = createToken(user._id);
                    res.status(201).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: 'Login successful', redirect: '/', name: `${user.firstName} ${user.middleName} ${user.lastName}`, email: user.email, id: user._id, profilePicture: user.profilePicture });
                })
                .catch((err) => {
                    const errors = handleErrors(err);
                    res.status(400).json(errors);
                })  
            } else {
                if(!name.status) {
                    res.status(400).json({ mssg: `${email} is not yet verified, click here to verify email`, verify: `/verify/${name._id}`, adminApprovedStatus: true });
                } else {
                    res.status(400).json({ mssg: `${email} is not yet verified, please contact administrator`, adminApprovedStatus: false });
                }
                
            }
           } else {
            res.status(400).json({ mssg: `${email} is an admin, cannot login to this page` });
           } 
       } else {
        res.status(400).json({ mssg: `${email} is not an existing account, please check email` });
       }
    })
    .catch(err => console.log(err));
    
}

module.exports.user_logout = (req,res) => {
    res.cookie('userJwt','',{ maxAge: 1 }).json({ redirect: '/login' });
}

module.exports.user_detail_get = (req,res) => {
    const { id } = req.params;

    User.findById(id)
    .then((user) => {
        res.json(user);
    })
    .catch(err => console.log(err));
}

module.exports.user_verify = async (req,res) => {
    const id = req.params.id;
    const { status } = req.body;
    
    try {
        const verifyUser = await User.updateOne({ _id: id }, { status });
        res.status(200).json({ mssg: 'Email has been verified, thank you.', redirect: '/login' })
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_resend_verification = async (req,res) => {
    const { email } = req.body;
    const id = req.params.id;

    try {
        const data = await User.findById(id);
        const info = await transporter.sendMail({
            from: `'Trash Reward App' <${process.env.MAIL_ACCOUNT}>`,
            to: `${email}`,
            subject: 'Account verification',
            html:  `
            <h1>Hello ${data.firstName} ${data.lastName}</h1>
            <p>Here is you code: <b>${data.code}</b></p>
        
            <p>Thank you for registering!</p>
            `
        });
        
        console.log(info.response);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).json({ redirect: `/verify/${id}` })
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_forgot_password = async (req,res) => {
    const { email } = req.body;
    const code = Math.floor(Math.random() * 100000);

    try {
        const data = await User.findOne({ email });
        if(data) {
            const userCode = await User.updateOne({ _id: data._id },{ code });
            const info = await transporter.sendMail({
                from: `'Trash Reward App' <${process.env.MAIL_ACCOUNT}>`,
                to: `${data.email}`,
                subject: 'Forgot Password',
                html:  `
                <h1>Hello ${data.firstName} ${data.lastName}</h1>
                <p>Here is you code: <b>${code}</b></p>
            
                <p>Thank you for registering!</p>
                `
            });
            res.status(200).json({ redirect: `/password-verify/${data._id}`, mssg: 'Email has been found, redirecting to verification page. Please check your email' })
        } else {
            res.status(400).json({ mssg: 'No existing email, please check input' });
        }
       
       
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_update_password = async (req,res) => {
    const id = req.params.id;
    const { password } = req.body;

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
       
        const data = await User.updateOne({ _id: id },{ password:hashedPassword });
        res.status(200).json({ mssg: 'Password has been updated, you can use your new password', redirect: '/login' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_receive_points = async (req,res) => {
    const id = req.params.id;

    const userId = id.split('-')[0];
    const collectedPoints = id.split('0')[1];
    console.log(userId,collectedPoints);
}

module.exports.comment_get = (req,res) => {

    Comment.find({}).populate('user_id')
    .then((comment) => {
        res.status(200).json(comment);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports.comment_post = (req,res) => {
    const { comment, userId, emailOfUser } = req.body;

    Comment.create({ comment, user_id: userId, email: emailOfUser })
    .then((com) => {
        res.status(201).json({ mssg: 'Thank you for commenting on our application!'});
    })
    .catch(err => {
        console.log(err);
    }) 
}

module.exports.admin_get = async (req,res) => {

    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch(err) {
        console.log(err);
    }

}

module.exports.admin_post = async (req,res) => {
    const { username,password,province,barangay,city } = req.body;

    try {
        const data = await Admin.create({ username, password, province, city, barangay });
        res.status(201).json({ mssg: `${username} has been registered, thank you for registering an admin.`, redirect:'/admin-login' });
    } catch(err) {
        console.log(err);
    }

}

module.exports.admin_login = async(req,res) => {
    const { username,password } = req.body;

    try {   
        const admin = await Admin.login(username,password);
        const token = createToken(admin._id);
        res.cookie('adminJwt',token,{ maxAge: maxAge * 1000 }).status(200).json({ mssg: `${admin.username} has been successfully logged-in`, redirect:'/admin/dashboard',adminId: admin._id })
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

module.exports.admin_logout = (req,res) => {
    res.cookie('adminJwt','',{ maxAge: 1 }).json({ redirect: '/admin-login' });
}

module.exports.admin_approve_user = async (req,res) => {
    const { id } = req.params;
    const adminId = id.split('-')[1];
    const userId = id.split('-')[0];
    try {
        const userFind = await User.findById(userId);
        const data = await User.updateOne({ _id: userId }, { adminApproved: true, approvedBy: adminId });
        const info = await transporter.sendMail({
            from: `'Trash Reward App' <${process.env.MAIL_ACCOUNT}>`,
            to: `${userFind.email}`,
            subject: 'Account Approved | Trash Reward App',
            html:  `
            <h1>Hello ${userFind.firstName} ${userFind.lastName}</h1>
            <p>This is to notify you that you have been approved by the admin</p>
        
            <p>You can now login to your account, thank you.</p>
            `
        });
        res.status(200).json({ mssg: `${userFind.firstName} has been approved, email has been sento to user`, redirect:'/admin/dashboard' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.admin_reject_user = async (req,res) => {
    
    const { id } = req.body;

    try {
        const userFind = await User.findById(id);
        const info = await transporter.sendMail({
            from: `'Trash Reward App' <${process.env.MAIL_ACCOUNT}>`,
            to: `${userFind.email}`,
            subject: 'Account Rejected | Trash Reward App',
            html:  `
            <h1>Hello ${userFind.firstName} ${userFind.lastName}</h1>
            <p>This is to notify you that you have been rejected by the admin</p>
        
            <p>Please contact your administrator for more information, thank you.</p>
            `
        });
        res.status(200).json({ mssg: `${userFind.firstName} has been rejected!`, redirect:'/admin/dashboard' });
    } catch(err) {
        console.log(err);
    }
}

module.exports.admin_delete_user = async (req,res) => {
    const { id } = req.params;

    try {
        const userFind = await User.findById(id); 
        const data = await User.deleteOne({ _id: id });
        const comment = await Comment.deleteOne({ user_id: id });
        const info = await transporter.sendMail({
            from: `'Trash Reward App' <${process.env.MAIL_ACCOUNT}>`,
            to: `${userFind.email}`,
            subject: 'Account Deleted | Trash Reward App',
            html:  `
            <h1>Hello ${userFind.firstName} ${userFind.lastName}</h1>
            <p>This is to notify you that your account has been deleted due to inactivity</p>
        
            <p>Please contact your administrator for more information, thank you.</p>
            `
        });
        res.status(200).json({ mssg: `${userFind.firstName} account was deleted`, redirect:'/admin/dashboard' });
    } catch(err) { 
        console.log(err);
    }
}

module.exports.category_get = async (req,res) => {

    try {
        const category = await Category.find();
        res.json(category);
    } catch(err) {
        console.log(err)
    }

}