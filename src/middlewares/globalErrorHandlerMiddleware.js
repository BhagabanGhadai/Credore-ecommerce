const errorHandler = require('../utils/errorHandler.js')
const logger = require('../utils/logger.js')
const configs = require('../configs/index.js')

/**
 * This middleware is responsible for catching all the errors that occur during the handling of each incoming request.
 * It logs the error if the application is in development mode, then sends a response with the status code and the error details.
 * @param {import('express').Express} expressApp - The express application.
 */
exports.ErrorHandlingMiddleware = (expressApp) => {
    expressApp.use(async (error, req, res, next) => {
        if (error && typeof error === 'object') {
            if (error.isTrusted === undefined || error.isTrusted === null) {
                error.isTrusted = true
            }
        }
        let err = await errorHandler.handleError(error)
        const response = {
            ...error,
            message: error.message,
            ...(configs.NODE_ENV === 'dev' ? { stack: error.stack } : {})
        }
        if (configs.NODE_ENV === 'dev') {
            logger.error(response)
        }
        return res.status(error.statusCode).send(response)
    })
}

