const { body, param, header, query } = require('express-validator');

const createOrderValidators = () => {
    return [
    body('totalPrice')
        .notEmpty()
        .withMessage('Price is required')
        .isInt()
        .withMessage('Price must be a number'),
    body('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage(`Invalid status, must be one of ${['pending', 'completed', 'cancelled'].join(', ')}`)
        .escape(),
    header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>')
    ];
  }
  const updateOrderValidators = () => {
    return [
    body('totalPrice')
        .optional()
        .isInt()
        .withMessage('Price must be a number'),
    body('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage(`Invalid status, must be one of ${['pending', 'completed', 'cancelled'].join(', ')}`)
        .escape(),
    header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>')
    ];
  }
  const getAllOrderValidator = () => {
    return [
      query("search")
        .optional()
        .isLength({ max: 20 })
        .withMessage("search may be at most 20 characters long")
        .escape(),  // Escape the input
      query("page")
        .optional()
        .isInt()
        .withMessage("Page must be a number")
        .toInt(),
      query("pageSize")
        .optional()
        .isInt()
        .withMessage("Page size must be a number")
        .toInt(),
      header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>')
    ];
  }

  const getOrderValidator = () => {
    return [
        param('orderId')
        .notEmpty()
        .withMessage('Order ID is required')
        .escape(),
      header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>')
    ];
  }

  const getOrderUserValidator = () => {
    return [
        param('userId')
        .notEmpty()
        .withMessage('User ID is required')
        .escape(),
      header('Authorization')
        .notEmpty()
        .withMessage('Authorization header is required')
        .matches(/^Bearer .+$/)
        .withMessage('Authorization header must be in format Bearer <jwt>')
    ];
  }
  module.exports={createOrderValidators,updateOrderValidators,getAllOrderValidator,getOrderValidator,getOrderUserValidator}