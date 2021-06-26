const {check,validationResult} = require('express-validator');

exports.register = [
 check('username').notEmpty().withMessage('username is required'),
 check('email').notEmpty().withMessage('Email is required')
 .isEmail().withMessage('Please enter valid email address'),
 check('password').notEmpty().withMessage('Password is required')
 .isLength({min:8}).withMessage('Enter atleast 8characters'),
 check('confirmpassword').notEmpty().withMessage('confirm password is required')
 .custom((value,{req}) => (value === req.body.password)).withMessage('Please enter the same password')
]

exports.login = [
 check('email').notEmpty().withMessage('Email is required')
 .isEmail().withMessage('Please enter valid email address'),
 check('password').notEmpty().withMessage('Password is required')
 .isLength({min:8}).withMessage('Enter atleast 8characters')
]

exports.bookadd = [
 check('title').notEmpty().withMessage('Title is required'),
 check('author').notEmpty().withMessage('Author is required'),
 check('price').notEmpty().withMessage('Price is required')
 .isNumeric().withMessage('Enter price only in number'),
 check('pages').notEmpty().withMessage('Page is required')
 .isNumeric().withMessage('Enter pages only in Number'),
 check('language').notEmpty().withMessage('Language is required'),
 check('description').notEmpty().withMessage('Description is required'),
]
