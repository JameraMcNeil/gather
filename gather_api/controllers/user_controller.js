const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router()
const User = require('../models/users.js');

users.get('/signup', (req,res) => {
    User.find({}, (err, foundUser) => {
		if(err) {
			res.status(400).json({ error: err.message });
		}
		res.status(200).json(foundUser);
	});
    
});

users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (error, createdUser) => {
        if(error) {
            res.status(400).json({ error: err.message})
        }
        res.status(200).send(createdUser)
        console.log('user is created', createdUser)
        res.redirect('/events')
    });
});

module.exports = users