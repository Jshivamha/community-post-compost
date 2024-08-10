const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../modals/User')

router.post('/',async(req,res) => {
    console.log('Visited Signup Page');
    
    try{
        const {name, email, password, state} = req.body
        
        if(!(name && email && password && state)){
            if(!name) console.log('name');
            if(!email) console.log('email');
            if(!password) console.log('password');
            if(!state) console.log('state');
            
           return res.status(401).send('All fields are compulsory')
        }
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            console.log('User already exist')
            return res.status(400).send('User already exists');
        }
        
        const hashedpwd = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password: hashedpwd,
            state,
        })

        
        res.status(200).send('User created successfully')
    }
    catch(err){
        console.log(err)
    }

    

})

module.exports = router