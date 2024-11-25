const prisma = require('../prisma/client/index.js');

class OrderItemRepository {
    async createOrderItem(orderItemData) {
        try {
            return await prisma.orderItem.create({
                data: orderItemData
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
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