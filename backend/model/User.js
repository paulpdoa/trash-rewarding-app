const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    middleName: {
        required: true,
        type: String
    },
    dateOfBirth: {
        required: true,
        type: Date
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    province: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    barangay: {
        required: true,
        type: String
    },
    code: {
        type: Number
    },
    userType: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: Boolean
    },
    adminApproved: {
        required: true,
        type: Boolean
    },
    collectedPoints: {
        type: Number
    },
    profilePicture: {
        required: true,
        type: String
    },
    idCard: {
        required:true,
        type: String
    }
}, { timestamps: true })

// fire a function before saving to database
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// create static login method for user
userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password,user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    } 
    throw Error('This email doesn\'t exist');
}

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;