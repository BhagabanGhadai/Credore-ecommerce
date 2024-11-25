const { body, param } = require('express-validator');

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

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgottenPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};

const userAssignRoleValidator = () => {
  return [
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

module.exports= {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgottenPasswordValidator,
  userAssignRoleValidator
};
