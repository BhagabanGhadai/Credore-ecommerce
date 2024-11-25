const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orders.js');
const { createOrderValidators,updateOrderValidators,getAllOrderValidator,getOrderValidator,getOrderUserValidator } = require('../validators/orders.js');
const validate = require('../validators/index.js');
const { verifyJWT,verifyPermission } = require('../middlewares/authMiddleware.js');
// orderRouter.use(validate);

orderRouter.post('/',createOrderValidators(), validate, verifyJWT,orderController.createOrder);
orderRouter.get('/',getAllOrderValidator(), validate,verifyJWT,orderController.getAllOrders);
orderRouter.get('/:orderId',getOrderValidator(), validate,verifyJWT, orderController.getOrder);
orderRouter.get('/user/:userId',getOrderUserValidator(), validate,verifyJWT, orderController.getAllOrdersByUserId);
orderRouter.patch('/:orderId',updateOrderValidators(), validate,verifyJWT, orderController.updateOrder);
orderRouter.delete('/:orderId',getOrderValidator(), validate,verifyJWT, orderController.deleteOrder);
orderRouter.delete('/user/:userId',getOrderUserValidator(), validate,verifyJWT, orderController.deleteAllOrdersByUserId);

module.exports = orderRouter;