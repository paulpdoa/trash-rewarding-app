const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const User = require("../model/User");


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
        const users = await User.find();
        res.status(201).json(users);
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_post = async (req,res) => {

    const user = req.body;
    const code = Math.floor(Math.random() * 100000);
   
    try {
        const newUser = await User.create(user);
        res.status(200).json({mssg: `${newUser.firstName} ${newUser.lastName} has been registered`, redirect: '/login'});
    } 
    catch(err) {
        if(err.code === 11000) {
            res.status(400).json({ mssg: 'Email is already in use, please choose another' })
        }
    }
}

module.exports.user_login = async (req,res) => {

}