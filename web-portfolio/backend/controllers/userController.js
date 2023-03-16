const User = require('../models/user');

exports.getUser = async (req, res) => {
    const { username } = req.params;
  
    try {
      const user = await User.findOne({ username });
      if (user) {
        res.json({ success: true, user });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };