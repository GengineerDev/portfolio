const express = require('express')
const entryController = require('../controllers/entryController')

const router = express.Router()

router.post('/', entryController.createEntry)
router.get('/', entryController.getEntry);
router.delete('/', entryController.deleteEntry)

module.exports = router
