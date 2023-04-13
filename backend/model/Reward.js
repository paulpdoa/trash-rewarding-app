const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    item: {
        required: true,
        type: String
    },
    point: {
        required: true,
        type: String
    }

}, { timestamps: true })

const RewardModel = mongoose.model('reward',rewardSchema);
module.exports = RewardModel;