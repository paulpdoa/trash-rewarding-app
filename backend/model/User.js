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
    }
}, { timestamps: true })

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;