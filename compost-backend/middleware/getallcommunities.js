const express = require('express')
const router = express.Router()
const Community = require('../modals/Community')
const User = require('../modals/User')

router.get('/', async (req,res,next) => {
    console.log("visited all community")
    try{
        const ownerId = await req.session.userId
        if (!ownerId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // find the user by their ID
        const user = await User.findById(ownerId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const communityIds = user.Communities;
        const communities = await Community.find({ _id: { $in: communityIds } });

        console.log(communities);
        
        res.status(200).json({communities});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router