const OrderItemRepository = require('../repositories/orderItems');
const OrderRepository = require('../repositories/orders');
const ProductRepository = require('../repositories/products');
const AppError = require('../utils/appError');
const StatusCodes = require('http-status-codes');

class OrderitemService{
    constructor(){
        this.orderitemrespository=new OrderItemRepository();
        this.productrespository=new ProductRepository();
    }
    async createOrderItem(orderItemData){
        try{
            const totalPrice = orderItemData.quantity * orderItemData.price;
            orderItemData.totalPrice = totalPrice;
            const orderItem=await this.orderitemrespository.createOrderItem(orderItemData);
            return orderItem;
        }
        catch(error){
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async deleteOrderItemById(orderItemId){
        try{
            console.log(orderItemId)
            const orderItem=await this.orderitemrespository.fetchOrderItemById(orderItemId);
            if(!orderItem){
                throw new AppError(StatusCodes.NOT_FOUND, 'orderItem not found');
            }
            const [deleterOderItem,_]=await Promise.all([
                this.orderitemrespository.deleteOrderItemById(orderItemId),
                this.productrespository.updateTheProductStock(orderItem.productId, orderItem.quantity)
            ])
            return deleterOderItem;
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