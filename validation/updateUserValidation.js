const { body } = require('express-validator');

const updateUserValidation = [
    body('name').not().isEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
        .isAlpha('en-US', { ignore: ' -' }).withMessage('Name must contain only letters, spaces, or dashes'),

    body('surname').not().isEmpty().withMessage('Surname is required')
        .isLength({ min: 2 }).withMessage('Surname must be at least 2 characters long')
        .isAlpha('en-US', { ignore: ' -' }).withMessage('Surname must contain only letters, spaces, or dashes'),

    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),

    body('username').isLength({ min: 5 }).withMessage('Username cannot be empty'),

    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];

module.exports = { updateUserValidation }