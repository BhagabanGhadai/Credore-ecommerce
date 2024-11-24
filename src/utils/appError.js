module.exports = class AppError extends Error {
    /**
     * Creates an instance of AppError.
     *
     * @param {number} statusCode - The HTTP status code of the error.
     * @param {string} [message='Something went wrong'] - The message of the error.
     * @param {Array<any>} [errors=[]] - The errors that caused the AppError.
     * @param {string} [stack=''] - The stack trace of the error.
     * @memberof AppError
     */
    constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
};

