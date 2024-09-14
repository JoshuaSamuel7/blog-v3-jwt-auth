const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not Found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload,  process.env.SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, {
            path: '/',
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite:'None',
        });
        return res.status(200).json({ message: 'Login successful!', user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.postRegister = async (req, res) => {
    try {
        const { name, username, password, mobile } = req.body;
        const checkuser = await User.findOne({ username });

        if (checkuser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword,
            mobile: mobile
        });

        await newUser.save();
        return res.status(200).json({ message: "Registration Success, Redirect to Login" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
exports.currentUser = async (req, res) => {
    try {
        res.status(200).json({user:req.user});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
};

exports.logoutUser = async (req, res) => {
    res.cookie("jwt", " ", { 
        path: '/', 
        maxAge: 0, 
        httpOnly: true, 
        secure: true, 
        sameSite: 'None' 
    });
        res.json({ message: 'Logged out successfully!' });
};