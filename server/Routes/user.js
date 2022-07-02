const express = require('express');
const router = express.Router();

//import middleware

const {requireSignin, authMiddleware, adminMiddleware} = require('../controller/auth')

//import controllers

const {read, update} = require('../controller/user');

//import validator
const { userUpdateValidator } = require('../validators/auth');
const {runValidation} = require('../validators')


//routes

router.get('/user', requireSignin, authMiddleware, read );

router.get('/admin', requireSignin, adminMiddleware, read );

router.put('/user', runValidation, requireSignin, authMiddleware, userUpdateValidator, update );




module.exports = router;
