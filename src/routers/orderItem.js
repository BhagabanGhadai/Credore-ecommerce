const express = require('express')
const orderItemRouter = express.Router()
const orderItemController = require('../controllers/orderItems')
const { verifyJWT,verifyPermission } = require('../middlewares/authMiddleware.js')
const validate = require('../validators/index.js');
const { getOrderItemValidator,createOrderItemValidator,updateOrderItemValidator } = require('../validators/orderItems.js');

orderItemRouter.get('/:orderItemId',getOrderItemValidator(),validate,verifyJWT, orderItemController.getOrderItem);
orderItemRouter.post('/', createOrderItemValidator(),validate,verifyJWT,orderItemController.createOrderItem);
orderItemRouter.patch('/:orderItemId',updateOrderItemValidator(),validate,verifyJWT, orderItemController.updateOrderItem);
orderItemRouter.delete('/:orderItemId',getOrderItemValidator(),validate,verifyJWT, orderItemController.deleteOrderItem);
orderItemRouter.delete('/order/:orderId',verifyJWT, orderItemController.deletAllOrderItemOfAOrder);

module.exports = orderItemRouter