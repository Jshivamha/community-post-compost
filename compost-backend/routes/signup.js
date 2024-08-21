const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../modals/User')

router.post('/',async(req,res) => {
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