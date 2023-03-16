const express = require('express');
const { getUser } = require('../controllers/userController');

const router = express.Router();

// POST request method
router.post('/users', getUser);

module.exports = router;
