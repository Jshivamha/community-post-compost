const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Community = require('../models/Community')

router.post('/create-post', async (req, res) => {
    console.log("visited create post page");
    
    try {
        const { commId, Postname, Postdescription } = req.body;
        console.log(commId, Postname, Postdescription);
        
        const userId = req.session.userId;

        if (!commId || !Postname) {
            return res.status(400).json({ message: "Community ID and Post name are required." });
        }

        const community = await Community.findById(commId);
        if (!community) {
            return res.status(404).json({ message: "Community not found." });
        }

        const newPost = await Post.create({
            user: userId,
            Postname,
            Postdescription,
        });

        community.posts.push(newPost._id);
        await community.save();

        res.status(200).json({ message: "Post created successfully!", post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router