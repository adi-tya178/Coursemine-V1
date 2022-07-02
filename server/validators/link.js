const {check} = require('express-validator');


exports.linkCreateValidator = [
    check('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),

    check('url')
    .not()
    .isEmpty()
    .withMessage('url is required'),

   
    check('categories')
    .not()
    .isEmpty()
    .withMessage('pick a category'),
    
    check('type')
    .not()
    .isEmpty()
    .withMessage('type is required'),
    
    check('medium')
    .not()
    .isEmpty()
    .withMessage('medium is required'),



];

exports.linkUpdateValidator = [
    check('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),

    check('url')
    .not()
    .isEmpty()
    .withMessage('url is required'),

    check('categories')
    .not()
    .isEmpty()
    .withMessage('pick a category'),
    
    check('type')
    .not()
    .isEmpty()
    .withMessage('type is required'),
    
    check('medium')
    .not()
    .isEmpty()
    .withMessage('medium is required'),



];

