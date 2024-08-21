const express = require('express')
const router = express.Router()
const User = require('../modals/User')
const getallcommunities = require('../middleware/getallcommunities')

router.use('/getallcommunities',getallcommunities);

router.get('/', async(req,res,next) => {
    try{
        const userId = req.session.userId
        const user = await User.findById(userId)
        const communityList = user.Communities
        console.log(communityList)
        res.status(200).json(communityList)

    }catch(err){
        console.log(err);
    }
})

const newpost = require('../middleware/new-post')
router.use('/new-post',newpost)

module.exports = router