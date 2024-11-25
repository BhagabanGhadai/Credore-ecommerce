module.exports = class ApiResponse {
    /**
     * Creates an instance of ApiResponse.
     *
     * @param {number} statusCode - The HTTP status code of the response.
     * @param {any} data - The data to be returned in the response.
     * @param {string} [message='Success'] - The message of the response.
     * @memberof ApiResponse
     */
    constructor(statusCode, data, message = 'Success') {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

