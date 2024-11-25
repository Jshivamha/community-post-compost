const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Postname: {
        type: String,
        required: true,
        trim: true,
    },
    Postdescription: {
        type: String,
        // required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
