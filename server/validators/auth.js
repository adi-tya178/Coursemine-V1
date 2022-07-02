const {check} = require('express-validator');


exports.userRegisterValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),

    check('email')
    .isEmail()
    .withMessage('Must be a valid email adress'),

    check('password')
    .isLength({min: 6})
    .withMessage('Password must have 6 Digit'),

    check('categories')
    .isLength({min: 1})
    .withMessage('Please select one Categorty')
];

exports.userLoginValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email adress'),

    check('password')
    .isLength({min: 6})
    .withMessage('Password must have 6 Digit'),
];

exports.forgotPasswordValidator = [
   

    check('email')
    .isEmail()
    .withMessage('Must be a valid email adress'),

   
];
exports.resetPasswordValidator = [
    check('newPassword')
    .isLength({min: 6})
    .withMessage('Password must have 6 Digit'),
    check('resetPasswordLink')
    .not()
    .isEmpty()
    .withMessage('Token is Required'),
];


exports.userUpdateValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),


   
];
