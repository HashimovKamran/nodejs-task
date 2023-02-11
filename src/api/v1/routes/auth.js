const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');
const loginValidation = require('../validations/loginValidation');
const registerValidation = require('../validations/registerValidation');

router.route('/register').post(registerValidation, registerUser);
router.route('/login').post(loginValidation, loginUser);

module.exports = router;