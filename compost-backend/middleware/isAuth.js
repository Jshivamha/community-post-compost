const express = require('express')
const session = require('express-session');

const isAuth = (req,res,next) => {
    if(req.session.isAuth){
        next();
    }else{
        console.log("Please Login first");
        res.send("Please Login first")
    }
}

module.exports = isAuth