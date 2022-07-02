const express = require('express');
const router = express.Router();

// import validators
const { userRegisterValidator, userLoginValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

// import from controllers
const { register, registerActivate, login, requireSignin, forgotPassword, resetPassword } = require('../controller/auth');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/register/activate', registerActivate);
router.post('/login', userLoginValidator, runValidation, login);
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword)

// router.get('/secret', (req, res) => {
//     res.json({
//         data: 'This is secret page for logged users'
//     })
// })
module.exports = router;
