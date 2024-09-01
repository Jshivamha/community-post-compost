const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/login',async(req,res) => {
    console.log('Visited login Page');
    
    try{
        const {email, password} = req.body
        
        if(!(email && password)){
            if(!email) console.log('email');
            if(!password) console.log('password');
            
           return res.status(401).send('All fields are compulsory')
        }
        
        const existingUser = await User.findOne({email})
        if(!existingUser){
            console.log('User does not already exist')
            return res.status(400).json({"err": "User not found"});
        }
        
        const ismatch = await bcrypt.compare(password,existingUser.password);
        if(!ismatch){
            console.log('Incorrect Password')
            return res.status(400).end('Incorrect Password')
        }
        req.session.isAuth = true;
        req.session.userId = existingUser._id;
        console.log(req.session);
        res.status(200).send("logged in");
        
    }
    catch(err){
        console.log(err)
    } 

})


router.post('/logout',async(req,res) => {
    console.log('Visited logout');
    await req.session.destroy((err) => {
        if(err) throw err;
    })
    console.log("logged out")
    res.status(200).send("User logged out");
})


router.post('/signup',async(req,res) => {
    console.log('Visited Signup Page');
    
    try{
        const {username, email, password} = req.body
        
        if(!(username && email && password)){
            if(!username) console.log('username');
            if(!email) console.log('email');
            if(!password) console.log('password');
            
           return res.status(401).send('All fields are compulsory')
        }
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            console.log('User already exist')
            return res.status(400).json({"err":'User already exists'});
        }
        
        const hashedpwd = await bcrypt.hash(password,10);
        const user = await User.create({
            name: username,
            email,
            password: hashedpwd,
        })

        
        res.status(200).send('User created successfully')
    }
    catch(err){
        console.log(err)
    }   

})
 
module.exports = router