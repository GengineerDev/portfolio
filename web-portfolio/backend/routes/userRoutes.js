const express = require('express');
const { getUser } = require('../controllers/userController');

const router = express.Router();

router.get('/:username', getUser);

module.exports = router;
