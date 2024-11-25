const { validationResult } =require('express-validator');
const AppError = require('../utils/appError.js');
const StatusCodes = require('http-status-codes');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY, "Received data is not valid", extractedErrors);
};

module.exports= validate