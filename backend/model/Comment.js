const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        required: true,
        type: String
    },
    user: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    }

}, { timestamps: true })

const CommentModel = mongoose.model('comment',commentSchema);
module.exports = CommentModel;