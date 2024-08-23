const express = require('express');
const session = require('express-session');

const isAuth = async (req, res, next) => {
    const sesh =  await req.session;
    console.log('Session:',sesh)
    console.log(req)
    // console.log('Session:', await req.session.isAuth)
    return next();
    
    if (sesh) {
        return next();
    } else {
        console.log("Please login first");
        return res.status(401).json({ "msg": "Please login first" });
        // return res.redirect('login');
    }
};

module.exports = isAuth;
