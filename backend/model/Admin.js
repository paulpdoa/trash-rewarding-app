const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const requiredString = {
    type: String,
    required: true
}

const adminSchema = new mongoose.Schema({
    username: requiredString,
    password: requiredString,
    province: requiredString,
    city: requiredString,
    barangay: requiredString
}, { timestamps: true })

// fire a function before saving to database
adminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// create static login method for user
adminSchema.statics.login = async function(username,password) {
    const admin = await this.findOne({ username });
    if(admin) {
        const auth = await bcrypt.compare(password,admin.password);
        if(auth) {
            return admin;
        }
        throw Error('Incorrect password');
    } 
    throw Error('This username doesn\'t exist');
}

const AdminModel = mongoose.model('admin',adminSchema);
module.exports = AdminModel;