const express = require('express');
const router = express.Router();
const User = require('../modals/User')

const newcommunity = require('../middleware/new-community')
router.use('/new-community',newcommunity)

const community = require('./community')
router.use('/mycommunity',community)

// const singlecommunity = require('../middleware/open-single-community')
// router.use('/:communityname',singlecommunity)

router.get('/dashboard',async(req,res) => {
    console.log('Visited dashboard');
    const user = await User.findById(req.session.userId);
    res.send(`Welcome to the dashboard ${user.name}`)
})

module.exports = router