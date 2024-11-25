const { body, param, header, query } = require('express-validator');

const addProductValidators = () => {
  return [
    body('name')
      .isLength({ min: 3, max: 50 })
      .withMessage('Name must be between 3 and 50 characters')
      .trim()
      .escape(),
    body('description')
      .optional()
      .isLength({ min: 10, max: 500 })
      .withMessage('Description must be between 10 and 500 characters')
      .trim()
      .escape(),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isInt()
      .withMessage('Price must be a number')
      .isFloat({ min: 1, max: 100000 })
      .withMessage('Price must be between 1 and 100000')
      .toFloat(),
    body('stockQuantity')
      .notEmpty()
      .withMessage('Stock quantity is required')
      .isInt({ min: 0, max: 1000 })
      .withMessage('Stock quantity must be between 0 and 1000')
      .toInt(),
    header('Authorization')
      .notEmpty()
      .withMessage('Authorization header is required')
      .matches(/^Bearer .+$/)
      .withMessage('Authorization header must be in format Bearer <jwt>')
  ];
};

const updateProductValidators = () => {
  return [
    param('productId')
      .notEmpty()
      .withMessage('Product ID is required')
      .escape(),
    body('name')
      .optional()
      .isLength({ min: 3, max: 50 })
      .withMessage('Name must be between 3 and 50 characters')
      .trim()
      .escape(),
    body('description')
      .optional()
      .isLength({ min: 10, max: 500 })
      .withMessage('Description must be between 10 and 500 characters')
      .trim()
      .escape(),
    body('price')
      .optional()
      .isFloat({ min: 1, max: 100000 })
      .withMessage('Price must be between 1 and 100000'),
    body('stockQuantity')
      .optional()
      .isInt({ min: 0, max: 1000 })
      .withMessage('Stock quantity must be between 0 and 1000'),
    header('Authorization')
      .notEmpty()
      .withMessage('Authorization header is required')
      .matches(/^Bearer .+$/)
      .withMessage('Authorization header must be in format Bearer <jwt>')
  ];
};

const getProductValidators = () => {
  return [
    param('productId')
      .notEmpty()
      .withMessage('Product ID is required')
      .escape(),
    header('Authorization')
      .notEmpty()
      .withMessage('Authorization header is required')
      .matches(/^Bearer .+$/)
      .withMessage('Authorization header must be in format Bearer <jwt>')
  ];
}
const getAllProductValidator = () => {
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
module.exports = { addProductValidators, updateProductValidators,getProductValidators,getAllProductValidator };
