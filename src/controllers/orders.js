const OrderService = require('../services/orders');
const StatusCodes = require('http-status-codes');
const ApiResponse = require('../utils/apiResponse');
const { catchAsync } = require('../utils/asyncHandler');

const orderService = new OrderService();

module.exports = {
    createOrder : catchAsync(async (req, res) => {
        const order = await orderService.createOrder(req.user.id,req.body.totalPrice);
        return res.status(StatusCodes.CREATED).json(new ApiResponse( StatusCodes.CREATED, order));
    }),
    getAllOrders : catchAsync(async (req, res) => {
        let filter = {
            include:{
                items:{
                    include:{
                        product:true
                    }
                }
            }
        }
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        const skip = (page - 1) * pageSize;
        filter.skip = skip;
        filter.take = pageSize;
        const orders = await orderService.fetchAllOrder(filter);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, orders));
    }),
    getAllOrdersByUserId : catchAsync(async (req, res) => {
        const orders = await orderService.fetchAllOrderByUserId(req.params.userId);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, orders));
    }),
    getOrder : catchAsync(async (req, res) => {
        const order = await orderService.fetchOrderById(req.params.orderId);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, order));
    }),
    deleteOrder : catchAsync(async (req, res) => {
        const order = await orderService.deleteOrderById(req.params.orderId);
        return res.status(StatusCodes.NO_CONTENT).json(new ApiResponse( StatusCodes.NO_CONTENT, order));
    }),
    deleteAllOrdersByUserId : catchAsync(async (req, res) => {
        const order = await orderService.deleteAllOrderByUserId(req.params.userId);
        return res.status(StatusCodes.NO_CONTENT).json(new ApiResponse( StatusCodes.NO_CONTENT, order));
    }),
    updateOrder : catchAsync(async (req, res) => {
        const order = await orderService.updateOrderById(req.params.orderId, req.body);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, order));
    })
}