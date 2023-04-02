const mongoose = require('mongoose');

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
    region: {
        required: true,
        type: String
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
    if(email) {
        const auth = await bcrypt.compare(password,user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('This username doesn\'t exist');
}

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;