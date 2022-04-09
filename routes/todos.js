const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

module.exports = router