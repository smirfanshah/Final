const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

const loginUser = (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {

        return res.status(200).json({ message: "Login successful", user: { username } });
    }
    return res.status(401).json({ message: "Invalid credentials" });
};

module.exports = { registerUser, loginUser };
