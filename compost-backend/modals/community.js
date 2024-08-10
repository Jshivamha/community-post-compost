const mongoose = require('mongoose');
const Schema = mongoose.Schema

const communitySchema = new Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Communityname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    Communitydescription: {
        type: String,
        trim: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Community = mongoose.model('Community', communitySchema);
module.exports = Community;
