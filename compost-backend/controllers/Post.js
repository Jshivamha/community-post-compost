const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Community = require('../models/Community');

// Create a Post
router.post("/createPost",async (req, res) => {
    try {
        const { commId, Postname, Postdescription } = req.body;
        console.log(commId, Postname)
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
            community: commId
        });

        community.posts.push(newPost._id);
        await community.save();

        res.status(200).json({ message: "Post created successfully!", post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

router.get("/getAllPosts", async (req, res) => {
    try {
        const posts = await Post.find().populate('community');
        console.log(posts)
        res.status(200).json({
            data: posts,
            message: "MA kyo ni chudata tu"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

// Get a Single Post
exports.getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('user', 'username').populate('community', 'name');
        
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a Post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { Postname, Postdescription } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { Postname, Postdescription },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found." });
        }

        res.status(200).json({ message: "Post updated successfully!", post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a Post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Remove from community if applicable
        const community = await Community.findOne({ posts: id });
        if (community) {
            community.posts.pull(id);
            await community.save();
        }

        res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = router;
