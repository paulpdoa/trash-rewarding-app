const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    item: {
        required: true,
        type: String
    },
    point: {
        required: true,
        type: String
    },
    itemImage: {
        required: true,
        type: String
    }

}, { timestamps: true })

const RewardModel = mongoose.model('reward',rewardSchema);
module.exports = RewardModel;