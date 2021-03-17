const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/users.js');
const { Router } = require('express');

sessions.get('/login', (req, res) => {
    res.render('sessions/login', {
        currentUser: req.session.currentUser
    });
});

sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if(err) {
            // database error
            console.log(err);
            res.send('Sorry, there was a server issue');
        } else if (!foundUser) {
            // We do not have a valid user. Let them make one
            res.send('<a href="/users/signup">Sorry no user found</a>')
        } else {
            // We have a matching password
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/events')
            } else {
                // no matching passwords. Send them back to the login screen
                res.send('<a href="/sessions/login">Sorry passwords did not match</a>')
            
            } 
        }
    
    });
});

sessions.delete('/', (req, res) => {
    // when we remove the session, redirect them to the login screen
    res.session.destroy(() => {
        res.redirect('/sessions/login');
    })
})

module.exports = sessions