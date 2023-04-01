const nodemailer = require('nodemailer');


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

    const htmlMssgFormat = `
    <h1>Hello ${user.firstName}</h1>
    <p>Your code is <span style="font-weight: 800">${code}</span></p>
    `; 

    console.log(htmlMssgFormat);

    try {
        const user = await User.create(user);
        const info = await transporter.sendMail({
            from: `'Trash Rewarding System' <polopdoandres@gmail.com>`,
            to: `${user.email}`,
            subject: 'Registration Code | Trash Rewarding App',
            html: htmlMssgFormat
        });

        console.log('Email was sent ' + info.response);
        
        res.json({mssg: `${user.firstName} ${user.lastName} has been registered`});
    } catch(err) {
        if(err.code === 11000) {
            res.status(400).json({ mssg: 'Email is already in use, please choose another' })
        }
    }
}
