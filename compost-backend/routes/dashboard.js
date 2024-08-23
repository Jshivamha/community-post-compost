const express = require('express');
const router = express.Router();
const User = require('../modals/User')

const newcommunity = require('../middleware/new-community')
router.use('/new-community',newcommunity)

const community = require('./community')
router.use('/mycommunity',community)

router.get('/dashboard',async(req,res) => {
    
    console.log('Visited dashboard');
    const userId = req.session.userId;
    if(!userId){
        return res.json({"msg": "user not found"})
    }
    const user = await User.findById(req.session.userId);
    res.status(200).json({"msg":`Welcome to the dashboard ${user.name}`})
})
 
module.exports = router