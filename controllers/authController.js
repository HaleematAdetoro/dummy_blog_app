const express = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const UserModel = require('../models/userModel');

const signup = async(req, res,) => {
    try{
        return res.status(201).json({
            status: true,
            data: req.user
        }) 
    } catch (error) {
        res.status(500).json({ status: false, data: error})
    }
    
   
}

const login = (req, res, { err, user, info}) => {
    if (!user) {
        return res.json({ message: 'Username or password is incorrect'})
    }

    req.login(user, { session: false },
        async (error) => {
            if (error) return res.status(400).json(error)

            const body = { _id: user._id, username: user.username};

            const token = jwt.sign({ user: body }, process.env.JWT_SECRET)

            return res.status(200).json({ token });
        }
    );
}



module.exports = {
    signup,
    login
}

