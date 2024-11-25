const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orders.js');
// const { addOrderValidators } = require('../validators/order.js');
const validate = require('../validators/index.js');
const { verifyJWT } = require('../middlewares/authMiddleware.js');
// orderRouter.use(validate);

orderRouter.get('/',orderController.getAllOrders);
orderRouter.get('/:orderId', orderController.getOrder);
orderRouter.get('/user/:userId', orderController.getAllOrdersByUserId);
orderRouter.post('/', verifyJWT,orderController.createOrder);
orderRouter.patch('/:orderId', orderController.updateOrder);
orderRouter.delete('/:orderId', orderController.deleteOrder);
orderRouter.delete('/user/:userId', orderController.deleteAllOrdersByUserId);

module.exports = orderRouter;