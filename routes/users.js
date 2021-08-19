const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user')
const passport = require('passport')
const users = require('../controllers/users')


//REGISTER
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser));
    
//LOGIN
router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',
        { failureFlash: true, failureRedirect: '/login' }),
    catchAsync(users.loginUser))

//LOGOUT
router.get('/logout', users.logout)


module.exports = router;