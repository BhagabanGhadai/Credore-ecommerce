const OrderRepository = require('../repositories/orders');
const AppError = require('../utils/appError');
const StatusCodes = require('http-status-codes');

class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async createOrder(userId, totalPrice) {
        try {
            return await this.orderRepository.createOrder({userId, totalPrice});
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error);
        }
    }

    async fetchAllOrder(filter) {
        try {
            return await this.orderRepository.fetchAllOrder(filter);
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error);
        }
    }

    async fetchAllOrderByUserId(userId) {
        try {
            return await this.orderRepository.fetchAllOrderByUserId(userId);
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error);
        }    
    }

    async fetchOrderById(orderId) {
        try {
            return await this.orderRepository.fetchOrderById(orderId);
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error);
        }    
    }

    async deleteOrderById(orderId) {
        try {
            return await this.orderRepository.deleteOrderById(orderId);
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error);
        }    
    }

    async deleteAllOrderByUserId(userId) {
        try {
            return await this.orderRepository.deleteAllOrderByUserId(userId);
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error);
        }    
    }
    async updateOrderById(orderId, updateData) {
        try {
            return await this.orderRepository.updateOrderById(orderId, updateData);
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error);
        }
    }

    }

module.exports = OrderService