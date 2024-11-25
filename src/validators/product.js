const { body, param } = require('express-validator');

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
      .toInt()
  ];
};

const updateProductValidators = () => {
  return [
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
  ];
};

module.exports = { addProductValidators, updateProductValidators };
