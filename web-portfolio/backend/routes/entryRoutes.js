const express = require('express')
const entryController = require('../controllers/entryController')
const upload = require('../config/multerConfig')

const router = express.Router()

router.post('/', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]), entryController.createEntry)
router.get('/:category', entryController.getEntry)
router.delete('/:id', entryController.deleteEntry)

module.exports = router