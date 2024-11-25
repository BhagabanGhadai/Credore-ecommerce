const express = require('express')
const orderItemRouter = express.Router()
const orderItemController = require('../controllers/orderItems')
const { verifyJWT } = require('../middlewares/authMiddleware.js')


orderItemRouter.get('/:orderItemId', orderItemController.getOrderItem);
orderItemRouter.post('/', verifyJWT,orderItemController.createOrderItem);
orderItemRouter.patch('/:orderItemId', orderItemController.updateOrderItem);
orderItemRouter.delete('/:orderItemId', orderItemController.deleteOrderItem);
orderItemRouter.delete('/order/:orderId', orderItemController.deletAllOrderItemOfAOrder);

module.exports = orderItemRouter