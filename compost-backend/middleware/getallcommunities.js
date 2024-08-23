const express = require('express')
const router = express.Router()
const Community = require('../modals/Community')

router.get('/', async (req,res,next) => {
    console.log("visited all community")
    try{
        const ownerId = await req.session.userId
        if (!ownerId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const communities = await Community.find();
        
        res.status(200).json({"Communities":communities});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router