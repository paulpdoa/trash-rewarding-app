const mongoose = require('mongoose');

const earnRewardSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    reward: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'reward'
    },
    point: {
        required: true,
        type: String
    },
    currentTime: {
        type: String,
        required:true
    }

}, { timestamps: true })

const EarnRewardModel = mongoose.model('earnreward',earnRewardSchema);
module.exports = EarnRewardModel;