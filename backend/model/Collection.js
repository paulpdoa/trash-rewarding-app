const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    material: {
        required: true,
        type: String
    }
}, { timestamps: true })

const CollectionModel = mongoose.model('collection',collectionSchema);
module.exports = CollectionModel;