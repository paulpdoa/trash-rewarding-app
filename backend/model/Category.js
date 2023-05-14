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
    measurement: [
        {
            points: {
                type: String,
                required: true
            },
            weight: {
                type: String
            },
            pcs: {
                type: String
            }
        }
    ]
}, { timestamps: true })

const CategoryModel = mongoose.model('category',categorySchema);
module.exports = CategoryModel;