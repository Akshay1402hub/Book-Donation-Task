const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // It Check that if user already exists or not
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists Register with other Email' });
        }

        // It Hash the password entered by the user while regestring 
        const passhashed = await bcrypt.hash(password, 10);
        //It create the new user
        const user = new User({ name, email, password: passhashed });
        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

module.exports = registerUser;
