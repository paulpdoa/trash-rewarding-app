const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        required: true,
        type: String,
        unique: true
    },
    unit: {
        type: String
    },
    points: {
        type: String,
        required: true
    }
    // measurement: [
    //     {
    //         points: {
    //             type: String,
    //             required: true
    //         },
    //         //Removed for enhancement, weight and pcs will be added by admin
    //         // weight: {
    //         //     type: String
    //         // },
    //         // pcs: {
    //         //     type: String
    //         // }
    //     }
    // ]
}, { timestamps: true })

const CategoryModel = mongoose.model('category',categorySchema);
module.exports = CategoryModel;