const prisma = require('../prisma/client/index.js');
const AppError = require('../utils/appError');
const StatusCodes = require('http-status-codes');

class OrderItemRepository {
    async createOrderItem(orderItemData) {
        try {
            return await prisma.$transaction(async (prisma) => {
                const [product,order] = await Promise.all([
                    prisma.product.findUnique({
                        where: {
                            id: orderItemData.productId
                        }
                    }),
                    prisma.order.findUnique({
                        where: {
                            id: orderItemData.orderId
                        }
                    })
                ])
                
                if (!product) {
                    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
                }
                if(!order){
                    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
                }
                
                if (product.stockQuantity < orderItemData.quantity) {
                    throw new AppError(StatusCodes.BAD_REQUEST, 'Insufficient stock');
                }

                const orderItem = await prisma.orderItem.create({
                    data: orderItemData
                });

                await prisma.product.update({
                    where: {
                        id: orderItemData.productId
                    },
                    data: {
                        stockQuantity: {
                            decrement: orderItemData.quantity
                        }
                    }
                });

                return orderItem;
            });
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error);
        }
    }

    async fetchAllOrderItem(filter) {
        try {
            
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async fetchOrderItemById(orderItemId) {
        try {
            return await prisma.orderItem.findUnique({
                where: {
                    id: orderItemId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async deleteOrderItemById(orderItemId) {
        try {
            return await prisma.orderItem.delete({
                where: {
                    id: orderItemId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async deleteAllOrderItemByOrderId(orderId) {
        try {
            return await prisma.orderItem.deleteMany({
                where: {
                    orderId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async updateOrderItemById(orderItemId, updateData) {
        try {
            return await prisma.orderItem.update({
                where: {
                    id: orderItemId
                },
                data: updateData
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
}

module.exports = OrderItemRepository;