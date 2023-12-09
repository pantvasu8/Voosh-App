const User = require('../models/user');
const Order = require('../models/order');
const bcrypt = require('bcrypt'); //password hashing
const jwt = require('jsonwebtoken');


exports.userSignup = async (req, res) => {
    try {

        const { name, phoneNumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, phoneNumber, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// API to login a user
exports.userLogin = async (req, res) => {
    try {

        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Comparing the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Generating a JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// API to add a new order
exports.addOrder = async (req, res) => {
    try {

        const { user_id, sub_total, phone_number } = req.body;

        const newOrder = new Order({ user_id, sub_total, phone_number });
        await newOrder.save();

        res.status(201).json({ message: 'Order added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// API to get order details
exports.getOrder = async (req, res) => {
    try {

        const { user_id } = req.query;
        const orders = await Order.find({ user_id });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

