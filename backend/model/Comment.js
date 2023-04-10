const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        required: true,
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    email: {
        type: String
    }

}, { timestamps: true })

const CommentModel = mongoose.model('comment',commentSchema);
module.exports = CommentModel;