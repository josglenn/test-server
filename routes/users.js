const express = require('express');
const { body } = require('express-validator');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersByLeadSource,
  getUsersByCompanySize
} = require('../controllers/userController');

const router = express.Router();

// Validation rules
const userValidation = [
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot be more than 50 characters'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot be more than 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('company_name')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 100 })
    .withMessage('Company name cannot be more than 100 characters'),
  body('company_size')
    .isIn(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'])
    .withMessage('Company size must be one of: 1-10, 11-50, 51-200, 201-500, 501-1000, 1000+'),
  body('website')
    .optional()
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Please enter a valid website URL'),
  body('lead_source')
    .isIn(['website', 'social_media', 'referral', 'advertisement', 'cold_call', 'email_campaign', 'event', 'other'])
    .withMessage('Lead source must be one of: website, social_media, referral, advertisement, cold_call, email_campaign, event, other')
];

// Routes
router.route('/')
  .get(getUsers)
  .post(userValidation, createUser);

router.route('/leads/:source')
  .get(getUsersByLeadSource);

router.route('/companies/:size')
  .get(getUsersByCompanySize);

router.route('/:id')
  .get(getUser)
  .put(userValidation, updateUser)
  .delete(deleteUser);

module.exports = router;
