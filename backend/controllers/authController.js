const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

//Function to create JWT
const generateToken = (userId) => {
    return jwt.sign({ user: userId }, JWT_SECRET, { expiresIn: '1d' }); //token expires in 1d
};

const register = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        //Check if the user already exists
        const existingEmail = await User.findOne({ email });
        if (existingUEmail) {
            return res.status(400).json({ error: 'An account with this email already exists' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'An account with this username already exists' });
        }

        //Create new user instance
        const newUser = new User({ username, email, password });
        //save the user, triggers pass hashing
        await newUser.save();

        //generate a token
        const token = generateToken(newUser._id);

        res.status(201).json({ message: 'User registered successfully', token, user: { id: newUser._id, username: newUser.username, email: newUser.email } });
    } catch (err) {
        res.status(500).json({ error: 'Server Error: ' + err.message });
    }
};

//If user exists then login
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        //Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found, check email and password' });
        }

        //compare the pass with hashed pass in db
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        //generate a token
        const token = generateToken(user._id);

        res.json({ message: 'User logged in successfully', token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Server Error: ' + err.message });
    }
};

module.exports = { register, login };

