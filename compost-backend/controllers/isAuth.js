const express = require('express');
const session = require('express-session');

const isAuth = (req, res, next) => {
    
    if (req.session && req.session.isAuth) {
        return next();
    } else {
        console.log("Please login first");
        return res.status(401).json({ "msg": "Please login first" });
        // return res.redirect('login');
    }
};

module.exports = isAuth;
