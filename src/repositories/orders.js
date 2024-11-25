const prisma = require('../prisma/client/index.js');
const AppError = require('../utils/appError');

class OrderRepository {
    async createOrder({userId, totalPrice}) {
        console.log(userId,totalPrice)
        try {
            return await prisma.order.create({
                data: {
                    userId,
                    totalPrice
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async fetchAllOrder(filter) {
        try {
            return await prisma.order.findMany(filter)
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }   
     async fetchAllOrderByUserId(userId) {
        try {
            return await prisma.order.findMany({
                where: {
                    userId: userId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async fetchOrderById(orderId) {
        try {
            return await prisma.order.findUnique({
                where: {
                    id: orderId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async deleteOrderById(orderId) {
        try {
            return await prisma.order.delete({
                where: {
                    id: orderId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async deleteAllOrderByUserId(userId) {
        try {
            return await prisma.order.deleteMany({
                where: {
                    userId: userId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async updateOrderById(orderId, updateData) {
        try {
            return await prisma.order.update({
                where: {
                    id: orderId
                },
                data: updateData
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
}

module.exports = OrderRepository