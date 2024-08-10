const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const User = require('../modals/User')

router.get('/',async(req,res) => {
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
            return res.status(400).redirect('/signup');
        }
        
        const ismatch = await bcrypt.compare(password,existingUser.password);
        if(!ismatch){
            console.log('Incorrect Password');
            return res.end('Incorrect Password')
        }

        req.session.isAuth = true;
        req.session.userId = existingUser._id;
        res.status(200).redirect('/u/dashboard')
    }
    catch(err){
        console.log(err)
    }

    

})

module.exports = router