const express = require('express')
const router = express.Router()
const Community = require('../modals/community')
const User = require('../modals/User')

router.get('/', async (req,res,next) => {
    console.log("visited new community")
    try{
        const {name, description} = req.body
        const ownerId = await req.session.userId

        // creating new community
        const newcommunity = await Community.create({
            ownerId: ownerId,
            Communityname: name,
            Communitydescription: description,
            members:[ownerId],
        })

        // adding community id to user community list
        const user = await User.findByIdAndUpdate(ownerId,{
             $push : { Communities: newcommunity._id }
        }, { new: true });
        console.log(user)
        

        console.log(`new community created ${name}`)
        res.status(200).send("community created")
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router