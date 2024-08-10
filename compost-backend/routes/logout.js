const express = require('express');
const router = express.Router();

router.post('/',(req,res) => {
    console.log('Visited logout');
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/')
    })
})

module.exports = router