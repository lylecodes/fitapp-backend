const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.signup = (req, res, next) => {
    // checks if email already exists
    User.findOne({
        email: req.body.email, 
    })
    .then((dbUser,err) => {
        if (dbUser) {
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.email && req.body.password) {
            if (err) {
                return res.status(500).json({message: "couldnt hash the password"}); 
            } else if (req.body.password) {
                return User.create(({
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                }))
                .then(() => {
                    res.status(200).json({message: "user created"});
                })
                .catch(err => {
                    console.log(err);
                    res.status(502).json({message: "error while creating the user"});
                });
            };
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

exports.login = (req, res, next) => {
    // checks if email exists
    User.findOne({
        email: req.body.email, 
    })
    .then((dbUser,error) => {
        console.log("from db",dbUser)
        if (!dbUser) {
             res.status(404).json({message: "user not found"});
             return;
        } else {
            // password hash
            if (error) { 
                res.status(502).json({message: "error while checking user password"});
                return;
            } else if(req.body.password === dbUser.password){
                const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                res.status(200).json({message: "user logged in", "token": token});
                console.log("SUCCESS")
            } else {
                res.status(401).json({message: "invalid credentials"});
                return;
            }
        console.log('FROM LOGIN', dbUser)
        }
    })
    .catch(err => {
        console.log('error', err);
    });
};

exports.isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        res.status(401).json({ message: 'unauthorized' });
    } else {
        res.status(200).json({ message: 'Welcome to the fit app' });
    };
};