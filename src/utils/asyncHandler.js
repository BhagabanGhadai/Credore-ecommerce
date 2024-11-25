/**
 * A higher order function to catch any errors that occur during the execution
 * of the given requestHandler, and pass them to the next middleware in the
 * stack.
 *
 * @param {function} requestHandler - The function for which errors should be
 * caught.
 * @returns {function} - A function which calls the requestHandler and catches
 * any errors that occur.
 */

exports.catchAsync = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}
