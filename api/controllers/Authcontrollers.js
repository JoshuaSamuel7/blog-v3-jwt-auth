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

        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, "secret", { expiresIn: '1h' });
        res.cookie(user.id, token, {
            path: '/',
            maxAge: 1000 * 60 * 15,
            httpOnly: true,
            secure: true,
            sameSite:'None',
        });
        return res.status(200).json({ message: 'Login successful!', token: token, user: user });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Registration Route
exports.postRegister = async (req, res) => {
    try {
        const { name, username, password, mobile } = req.body;
        const checkuser = await User.findOne({ username });
        console.log(name, username, password, mobile);

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

        const userID = Object.keys(req.cookies)[0];  // Extract the first key as userID

        if (!userID) {
            return res.status(400).json({ message: 'User ID not found in cookies.' });
        }

        const user = await User.findOne({ _id: userID });  // Use 'await' and correct key '_id'
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user: user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
};

exports.logoutUser = (req, res) => {
    const userID = Object.keys(req.cookies)[0];
    console.log(userID);
    const token = req.cookies[userID];
    res.cookie(userID, token, { path: "/", maxAge: 1000, httpOnly: true })
    console.log("Logout Success");
    res.status(200).json("Logout success");
}