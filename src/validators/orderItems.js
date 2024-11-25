const { body, param, header, query } = require('express-validator');

const createOrderItemValidator = () => {
    return [
      body('orderId')
        .notEmpty()
        .withMessage('Order ID is required')
        .escape(),
      body('productId')
        .notEmpty()
        .withMessage('Product ID is required')
        .escape(),
      body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 1, max: 100000 })
        .withMessage('Price must be between 1 and 100000'),
      body('quantity')
        .notEmpty()
        .withMessage('Quantity is required')
        .isInt({ min: 1, max: 1000 })
        .withMessage('Quantity must be between 1 and 1000'),
      header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>')
    ];
}
const getOrderItemValidator = () => {
    return [
        param('orderItemId')
        .notEmpty()
        .withMessage('Order Item ID is required')
        .escape(),
      header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>')
    ];
  }
  const updateOrderItemValidator = () => {
    return [
        param('orderItemId')
        .notEmpty()
        .withMessage('Order Item ID is required')
        .escape(),
      header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>'),
      body('price')
        .optional()
        .isFloat({ min: 1, max: 100000 })
        .withMessage('Price must be between 1 and 100000'),
      body('quantity')
        .optional()
        .isInt({ min: 1, max: 1000 })
        .withMessage('Quantity must be between 1 and 1000'),
      body('orderId')
        .optional()
        .escape(),
      body('productId')
        .optional()
        .escape()
    ];
  }
  
  const deleteOrderItemValidator = () => {
    return [
        param('orderId')
        .notEmpty()
        .withMessage('Order Item ID is required')
        .escape(),
      header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>')
    ];
  }
  module.exports={getOrderItemValidator,createOrderItemValidator,updateOrderItemValidator,deleteOrderItemValidator}
