const mongoose = require('mongoose');

const earnPointSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    point: {
        required: true,
        type: String
    }

}, { timestamps: true })

const EarnPointModel = mongoose.model('earnpoint',earnPointSchema);
module.exports = EarnPointModel;