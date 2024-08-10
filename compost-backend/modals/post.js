const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        // required: true,
        trim: true,
    },
    // image: {
    //     type: String,
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    // comments: [{
    //     user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //     },
    //     comment: {
    //         type: String,
    //         trim: true,
    //     },
    //     createdAt: {
    //         type: Date,
    //         default: Date.now,
    //     }
    // }]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
