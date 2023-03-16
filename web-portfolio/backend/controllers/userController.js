const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Passwords match
        res.json({ success: true, user });
      } else {
        // Passwords don't match
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      // User not found
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
