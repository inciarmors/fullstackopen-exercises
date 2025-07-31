const usersRouter = require('express').Router()
const userController = require('../controllers/users')

usersRouter.get('/', userController.getAllUsers)
usersRouter.post('/', userController.createUser)

module.exports = usersRouter
