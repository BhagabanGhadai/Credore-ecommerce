const { body, param,header,query } = require('express-validator');

const AvailableUserRoles = ['user', 'admin'];

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .escape(),  // Escape the input

    body("name")
      .trim()
      .notEmpty()
      .withMessage("User name is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .escape(),  // Escape the input

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ max: 15 })
      .withMessage("Password must be at most 15 characters long")
      .escape(),  // Escape the input

    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage(`Invalid user role, must be one of ${AvailableUserRoles.join(', ')}`)
      .escape(),  // Escape the input
  ];
};


const userLoginValidator = () => {
  return [
    body("email")      
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .escape(),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ max: 15 })
    .withMessage("Password must be at most 15 characters long")
    .escape(),
  ];
};

const tokenValidator = () => {
  return [
    body("refreshToken").notEmpty().withMessage("Refresh token is required"),
    body("accessToken").notEmpty().withMessage("Access token is required"),
  ];
};


const userResetForgottenPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};

const getUserValidators = () => {
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

const updateUserValidator = () => {
  return [
    param('userId')
      .notEmpty()
      .withMessage('User ID is required')
      .escape(),
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .escape(),  // Escape the input
    body("email")
      .optional()
      .isEmail()
      .withMessage("Email is invalid")
      .escape(),  // Escape the input
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage(`Invalid user role, must be one of ${AvailableUserRoles.join(', ')}`)
      .escape(),  // Escape the input
    header('Authorization')
      .notEmpty()
      .withMessage('Authorization header is required')
      .matches(/^Bearer .+$/)
      .withMessage('Authorization header must be in format Bearer <jwt>')
  ];
}

const getAllUserValidator = () => {
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
module.exports= {
  userLoginValidator,
  userRegisterValidator,
  getUserValidators,
  updateUserValidator,
  tokenValidator,
  getAllUserValidator
};

