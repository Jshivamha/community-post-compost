const express = require('express');
const router = express.Router();

router.post('/',async(req,res) => {
    console.log('Visited logout');
    await req.session.destroy((err) => {
        if(err) throw err;
    })
    console.log("logged out")
    res.status(200).send("User logged out");
})

module.exports = router