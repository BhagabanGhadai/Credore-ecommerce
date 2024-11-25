const OrderitemService = require('../services/orderItems');
const StatusCodes = require('http-status-codes');
const ApiResponse = require('../utils/apiResponse');
const { catchAsync } = require('../utils/asyncHandler');
const { get } = require('lodash');
const { getOrder } = require('./orders');

const orderItemService = new OrderitemService();

module.exports={
    createOrderItem : catchAsync(async (req, res) => {
        const orderItem = await orderItemService.createOrderItem(req.body);
        return res.status(StatusCodes.CREATED).json(new ApiResponse( StatusCodes.CREATED, orderItem));
    }),
    deleteOrderItem : catchAsync(async (req, res) => {
        const orderItem = await orderItemService.deleteOrderItemById(req.params.orderItemId);
        return res.status(StatusCodes.NO_CONTENT).json(new ApiResponse( StatusCodes.NO_CONTENT, orderItem));
    }),
    deletAllOrderItemOfAOrder : catchAsync(async (req, res) => {
        const orderItem = await orderItemService.deleteAllOrderItemByOrderId(req.params.orderId);
        return res.status(StatusCodes.NO_CONTENT).json(new ApiResponse( StatusCodes.NO_CONTENT, orderItem));
    }),
    getOrderItem : catchAsync(async (req, res) => {
        const orderItem = await orderItemService.fetchOrderItemById(req.params.orderItemId);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, orderItem));
    }),
    updateOrderItem : catchAsync(async (req, res) => {
        const orderItem = await orderItemService.updateOrderItemById(req.params.orderItemId, req.body);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, orderItem));
    })
}
