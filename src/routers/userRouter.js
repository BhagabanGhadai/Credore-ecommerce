const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/users.js');
const { userRegisterValidator,userLoginValidator,getUserValidators,updateUserValidator,tokenValidator,getAllUserValidator } = require('../validators/user.js');
const validate = require('../validators/index.js');
const { verifyJWT,verifyPermission } = require('../middlewares/authMiddleware.js');

userRouter.post('/', userRegisterValidator(), validate, userController.createUser);
userRouter.post('/login',userLoginValidator(), validate, userController.login);
userRouter.get('/',getAllUserValidator(), validate,verifyJWT,verifyPermission,userController.getAllUsers);
userRouter.get('/:userId',getUserValidators(), validate,verifyJWT, userController.getCurrentUser);
userRouter.patch('/:userId',updateUserValidator(), validate,verifyJWT, userController.updateUser);
userRouter.delete('/:userId',getUserValidators(), validate,verifyJWT,verifyPermission, userController.deleteUser);
userRouter.post('/refresh-token',tokenValidator(),validate, userController.refreshAccessToken);
userRouter.post('/logout',tokenValidator(),validate, verifyJWT,userController.logout);

module.exports = userRouter;