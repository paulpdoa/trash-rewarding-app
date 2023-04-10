const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const User = require("../model/User");
const Comment = require("../model/Comment");

const maxAge = 3 * 24 * 24 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    let errors = { email: '', password: '' };

    if(err.message === 'Incorrect password') {
       errors.password = 'Password is incorrect';
    }
    if(err.message === 'This email doesn\'t exist') {
        errors.email = 'Email is incorrect';
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
        const users = await User.find();
        res.status(201).json(users);
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_post = (req,res) => {

    const { firstName,lastName,middleName,dateOfBirth, password, email, province, barangay, city } = req.body;
    const { filename } = req.file;
    console.log(dateOfBirth);

    const code = Math.floor(Math.random() * 100000);
    const userType = 'user';
    const status = false;

    try {
        const newUser = User.create({ firstName,lastName,middleName,dateOfBirth, password, email, province, barangay, city, code, userType, status, profilePicture: filename });
        
        if(newUser) {
            res.status(201).json({mssg: 'User has been successfully registered!', redirect: '/login'})
        } else {
            res.status(201).json({mssg: 'Cannot register this user, please contact administrator'})
        }
       
    } catch(err) {
        if(err.code === 11000) {
            res.status(400).json({mssg: 'This email is already in use, please choose another email'});
        }
    }   
}

module.exports.user_login = (req,res) => {
    const { email, password } = req.body;
    let firstName = '';
    let middleName = '';
    let lastName = '';
    let id = ''
    let profilePicture = '';
    

    User.findOne({email})
    .then((name) => {
        firstName = name.firstName;
        middleName = name.middleName;
        lastName = name.lastName;
        id = name._id
        profilePicture = name.profilePicture;
    }).
    catch(err => console.log(err));

    User.login(email,password)
    .then((user) => {
        const token = createToken(user._id);
        res.status(201).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: 'Login successful', redirect: '/', name: `${firstName} ${middleName} ${lastName}`, email: email,id: id, profilePicture });
    })
    .catch((err) => {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    })
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
        res.status(201).json({ mssg: 'Comment has been posted'});
    })
    .catch(err => {
        console.log(err);
    }) 
}

