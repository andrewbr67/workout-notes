const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

//Create the new user through an API request
router.post('/register', register);

//Login an existing user
router.post('/login', login);

module.exports = router;