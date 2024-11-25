const OrderItemRepository = require('../repositories/orderItems');
const OrderRepository = require('../repositories/orders');
const AppError = require('../utils/appError');
const StatusCodes = require('http-status-codes');

class OrderitemService{
    constructor(){
        this.orderitemrespository=new OrderItemRepository();
        this.orderrepository=new OrderRepository();
    }
    async createOrderItem(orderItemData){
        try{
            const orderItem=await this.orderitemrespository.createOrderItem(orderItemData);
            return orderItem;
        }
        catch(error){
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async deleteOrderItemById(orderItemId){
        try{
            const orderItem=await this.orderitemrespository.deleteOrderItemById(orderItemId);
            return orderItem;
        }
        catch(error){
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async deleteAllOrderItemByOrderId(orderId){
        try{
            const orderItem=await this.orderitemrespository.deleteAllOrderItemByOrderId(orderId);
            return orderItem;
        }
        catch(error){
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async fetchOrderItemById(orderItemId){
        try{
            const orderItem=await this.orderitemrespository.fetchOrderItemById(orderItemId);
            return orderItem;
        }
        catch(error){            
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async updateOrderItemById(orderItemId, updateData){
        try{
            const orderItem=await this.orderitemrespository.updateOrderItemById(orderItemId, updateData);
            return orderItem;
        }
        catch(error){
            throw new AppError(error.statusCode, error.message, error)
        }
    }

}

module.exports=OrderitemService