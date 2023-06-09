const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require("../model/User");
const Comment = require("../model/Comment");
const Admin = require('../model/Admin');
const Category = require('../model/Category');
const EarnPoint = require('../model/EarnPoint');
const EarnReward = require('../model/EarnReward');
const Reward = require('../model/Reward');
const Collection = require('../model/Collection');

const d = new Date(); // for now
const currentTime = d.getHours() + ':' + d.getMinutes();
const currentDate = d.getFullYear() + '-' + `${d.getMonth() < 10 ? '0'+ Number(d.getMonth() + 1) :  Number(d.getMonth() + 1) }` + '-' + `${d.getDate() < 10 ? '0' + Number(d.getDate()) : Number(d.getDate())}`;
const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const currentMonth = monthList[Number(d.getMonth())];

const maxAge = 3 * 24 * 24 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
}

//Handling error, to make function reusable
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

//for sending email to users
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_ACCOUNT, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
    }
});

// to get all users
module.exports.user_get = async (req,res) => {
    try {
        const users = await User.find().populate('approvedBy');
        res.status(201).json(users);
    } catch(err) {
        console.log(err);
    }
}

// code for user registration
module.exports.user_post = async (req,res) => {

    const { firstName,lastName,middleName,dateOfBirth, password, email, province, barangay, city } = req.body;

    const avatar = req.files['avatar'][0].filename;
    const idCard = req.files['idCard'][0].filename;

    const code = Math.floor(Math.random() * 100000);
    const userType = 'user';
    const status = false;
    const adminApproved = false;
    const collectedPoints = 0;

    const htmlContent = `
    <h1>Hello ${firstName} ${lastName}</h1>
    <p>Here is your code: <b>${code}</b></p>

    <p>Thank you for registering!</p>
    `;

    try {
        const newUser = await User.create({ firstName,lastName,middleName,dateOfBirth, password, email, province, barangay, city, code, userType, status, profilePicture: avatar,adminApproved,idCard,collectedPoints });
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

    User.findOne({email}) // find the user first 
    .then((name) => {
       if(name) {
        if(name.userType === 'user') {
            if(name.status && name.adminApproved) {
                User.login(email,password) 
                .then((user) => {
                    const token = createToken(user._id);
                    res.status(201).cookie('userJwt', token, { maxAge: maxAge * 1000 }).json({ mssg: 'Login successful', redirect: '/', name: `${user.firstName} ${user.middleName} ${user.lastName}`, email: user.email, id: user._id, profilePicture: user.profilePicture, userJwt: token, userLoc: user.barangay });
                })
                .catch((err) => {
                    const errors = handleErrors(err);
                    res.status(400).json(errors);
                })  
            } else {
                // for checking of status of user, if user is not yet verified, then user cannot login
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
    const collectedPoints = Number(id.split('-')[1].split('=')[0]);
    const material = id.split('-')[2];
    const quantity = id.split('-')[3] + ' ' + id.split('-')[4];
    const userLocation = id.split('-')[5];
    const generatedQrCode = collectedPoints + id.split('-')[1].split('=')[1];
    
    try {
        const userFound = await User.findById(userId);
        //Check if qr code is new, if not new then trap user to ask admin for new qr code
        if(userFound.scannedQrCode === generatedQrCode) {
            res.status(400).json({ mssg: 'You cannot scan again, please ask admin before scanning' });
        } else {
            const categoryFind = await Category.find({ category: material });
            
            const user = await User.updateOne({ _id: userId },{ collectedPoints: collectedPoints + userFound.collectedPoints, scannedQrCode: generatedQrCode });
            const epoint = await EarnPoint.create({ user_id: userId, point: collectedPoints,currentTime });
            const collection = await Collection.create({ user_id: userId, material: categoryFind[0]._id, quantity, pointsAdded: collectedPoints,date: currentDate, month: currentMonth, user:userFound.firstName,materialName: material,barangay: userLocation});
            res.status(200).json({ mssg: `${collectedPoints} has been added to your point, keep collecting trash!` });
        }
       
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_receive_rewards = async (req,res) => {
    const id = req.params.id;

    const userId = id.split('-')[0];
    const rewardPickedId = id.split('-')[1];

    try {
        const userFind = await User.findById(userId);
        const reward = await Reward.findById(rewardPickedId);

        const deductedPoints = '-'+ reward.point;

        // Check if user points is enough
        if(userFind.collectedPoints < reward.point) {
            res.status(400).json({ mssg: 'You don\'t have enough points' });
        } else {
            if(reward.quantity < 1) {
                res.status(400).json({ mssg: 'This item is out of stock' });
            } else {
                const userUpdatePoint = await User.updateOne({ _id: userId },{ collectedPoints: userFind.collectedPoints - reward.point });
                const earnPoint = await EarnPoint.create({ user_id: userId, point: deductedPoints, currentTime });
                const earnRewards = await EarnReward.create({ user_id: userId, reward: rewardPickedId, point: deductedPoints, currentTime });
                const deductReward = await Reward.updateOne({ _id: rewardPickedId }, { quantity: reward.quantity - 1 });
                res.status(200).json({ mssg: `You have received a reward, ${reward.point} has been deducted to your points` });     
            }
        } 



    } catch(err) {
        console.log(err);
    }
}

module.exports.user_point_get = async (req,res) => {

    try {
        const points = await EarnPoint.find().populate('user_id');
        res.status(200).json(points);
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_point_detail_get = async (req,res) => {
    const userId = req.params.id;
    
    try {   
        const data = await EarnPoint.find({ user_id: userId }).populate('user_id');
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
    }
}

module.exports.user_reward_detail_get = async (req,res) => {
    const userId = req.params.id;

    try {
        const data = await EarnReward.find({ user_id: userId }).populate('reward user_id');
        res.status(200).json(data);
    } catch(err) {
        console.log(err);
    }

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
        res.cookie('adminJwt',token,{ maxAge: maxAge * 1000 }).status(200).json({ mssg: `${admin.username} has been successfully logged-in`, redirect:'/admin/dashboard',adminId: admin._id,adminJwt: token,adminLoc: admin.barangay })
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
        const earnpoint = await EarnPoint.deleteOne({ user_id: id });
        const earnreward = await EarnReward.deleteOne({ user_id:id });
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

// Add Rewards
module.exports.add_rewards = async (req,res) => {
    const { filename } = req.file;
    const { item,point,quantity, barangay } = req.body;
    const uniqueId = Math.floor(Math.random() * 100000);
    
    try {
        const newReward = await Reward.create({ item,point,itemImage:filename,quantity, uniqueId, barangay });
        res.status(200).json({ mssg: `${item} has been added`, currentPage:'Reward List' });
    } catch(err) {
        if(err.code === 11000) {
            res.status(400).json({ mssg: `${item} is already existing, please add another item` });
        }
    }

}

module.exports.delete_reward = async (req,res) => {
    const { id } = req.params
    
    try {
        const deleteReward = await Reward.deleteOne({ _id: id });
        res.status(200).json({ mssg: 'Reward has been deleted', currentPage: 'Reward List' })
    } catch(err) {
        console.log(err);
    }

}

module.exports.update_reward = async (req,res) => {

    const { id } = req.params
    const { rewardName, points, quantity } = req.body;

    try {
        const reward = await Reward.updateOne({ _id:id },{ item: rewardName, point: points, quantity });
        res.status(200).json({ mssg: `${rewardName} has been updated` });
    } catch(err) {
        console.log(err);
    }
}



module.exports.category_get = async (req,res) => {

    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch(err) {
        console.log(err)
    }
}

module.exports.category_detail_get = async (req,res) => {
    const { id } = req.params;
    
    try {
        const categ = await Category.findById(id);
        res.status(200).json(categ);
    } catch(err) {
        console.log(err);
    }
}

module.exports.add_category = async(req,res) => {
    const { category,unit,points } = req.body;

    // const measurement = {
    //     points
    // }

    try {
        const categ = await Category.create({ category,unit,points });
        res.status(200).json({ mssg: `${category} has been added` });
    } catch(err) {
        if(err.code === 11000) {    
            console.log(err);
            if(err.keyValue.category) {
                res.status(400).json({ mssg: `${err.keyValue.category} is already existing, please update if you have changes` });
            } 
            // else {
            //     res.status(400).json({ mssg: `${err.keyValue['measurement.weight']} is already existing, please update if you have changes` });
            // }
        }
    }
}

module.exports.delete_category = async (req,res) => {
    const { id } = req.params; 

    try {
        const categRec = await Category.findById(id);
        const deleteCateg = await Category.deleteOne({ _id: id });
        res.status(200).json({ mssg: `${categRec.category} has been deleted` });
    } catch(err) {
        console.log(err);
    }
}

module.exports.update_category = async (req,res) => {
    
    const { id } = req.params;
    const { points } = req.body;
    
    try {
        const categFind = await Category.findById(id);

        if(categFind.points === points) {
            res.status(400).json({ mssg: 'Point has not been changed' });
        } else {
            const categ = await Category.updateOne({ _id:id }, { points: points });
            res.status(200).json({ mssg: 'Category has been updated' });
        }
        // const categ = await Category.updateOne({ _id:id }, { $push: { measurement: { points } } });
       
    } catch(err) {
        alert(err.response.data.mssg);
    }

}

module.exports.reward_get = async (req,res) => {
    try {
        const rewards = await Reward.find();
        res.status(200).json(rewards);
    } catch(err) {
        console.log(err);
    }
}
module.exports.reward_detail_get = async (req,res) => {

    const { id } = req.params;

    try {
        const reward = await Reward.findById(id);
        res.status(200).json(reward);
    } catch(err) {
        console.log(err);
    }
}

module.exports.collection_get = async (req,res) => {
    try {
        const collections = await Collection.find().populate('user_id material');
        res.status(200).json(collections);
    } catch(err) {  
        console.log(err);
    }
}

module.exports.collection_report = async (req,res) => {
    const { from,to } = req.body;

    const startDate = from;
    const endDate = to;

    try {
        const collections = await Collection.find({ date: { $gte: startDate, $lte: endDate }}).populate('user_id material');
        console.log(collections);
        res.status(200).json(collections);
    } catch(err) {
        console.log(err);   
    }

}