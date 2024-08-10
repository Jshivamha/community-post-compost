const express = require('express');
const router = express.Router();
const Community = require('../modals/community')

const newpost = require('../middleware/new-post')
router.use('/new-post',newpost)

router.get('/',async(req,res) => {
    try{
        const {communityname} = req.params;
        const {communityId} = req.body;

        const details = await Community.findById(communityId)
        console.log(details);
        res.status(200).json(details)

    }catch(err){
        console.log(err);
    }
})

module.exports = router