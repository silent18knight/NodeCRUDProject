const User = require('../models/User');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = 'my_secret';

//Registration user

router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    try {
        const newUser = new User({username, password});
        await newUser.save();
        res.status(201).json({message : 'User registered successfully'}); 
    } catch(error) {
        if(error.code == 11000) {
            return res.status(400).json({message: 'user already present in the database'});
        }
        res.status(500).json({message : 'some error came'});
    }
});

//login though the user

router.post('/logins', async(req, res) => {
    const{username, password} = req.body;

    try {
        const user = await User.findOne({username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message: 'user is not authorized'});
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '1hr'});
        res.status(200).json({token});
    } catch(error) {
        res.status(500).json({message:'some error happened'});
    }
});

module.exports = router;