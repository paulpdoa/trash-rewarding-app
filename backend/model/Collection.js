const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    material: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category' 
    },
    quantity: {
        required:true,
        type: String
    },
    pointsAdded: {
        required: true,
        type: String
    },
    date: {
        type: String,
        required:true
    },
    month: {
        type: 'String',
        required: true
    }
}, { timestamps: true })

const CollectionModel = mongoose.model('collection',collectionSchema);
module.exports = CollectionModel;