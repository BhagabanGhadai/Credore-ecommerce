const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/users.js');
const { userRegisterValidator,userLoginValidator } = require('../validators/user.js');
const validate = require('../validators/index.js');

userRouter.get('/',userController.getAllUsers);
userRouter.get('/:userId', userController.getCurrentUser);
userRouter.post('/', userRegisterValidator(), validate, userController.createUser);
userRouter.patch('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.post('/login',userLoginValidator(), validate, userController.login);
userRouter.post('/refresh-token', userController.refreshAccessToken);
userRouter.post('/logout', userController.logout);

module.exports = userRouter;