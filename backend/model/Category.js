const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        required: true,
        type: String
    },
    measurement: {
        required: true,
        type:String
    }
}, { timestamps: true })

const CategoryModel = mongoose.model('category',categorySchema);
module.exports = CategoryModel;