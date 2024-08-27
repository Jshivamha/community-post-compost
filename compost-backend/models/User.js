const mongoose = require('mongoose');
const Community = require('./Community');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Communities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    }]
});

const User = mongoose.model('User',userSchema)
module.exports = User