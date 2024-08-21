const express = require('express')
const router = express.Router()
const Post = require('../modals/post')
const Community = require('../modals/Community')

router.get('/', async (req,res,next) => {
    console.log("visited newpost")
    try{
        const {title, description, communityId} = req.body
        const userId = await req.session.userId

        const newpost = await Post.create({
            user: userId,
            title,
            description,
        })

        // adding new post id to communities post's list
        const community = await Community.findByIdAndUpdate(communityId,{
                $push : { posts: newpost._id }
        }, { new: true });
        // console.log(community)
    
        console.log("newpost created")
        res.status(200).send("post created")
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router