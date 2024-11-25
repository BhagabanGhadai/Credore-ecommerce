const { catchAsync } = require('../utils/asyncHandler.js')
const AppError = require('../utils/appError.js')
const { StatusCodes } = require('http-status-codes')
const helper = require('../utils/helpers.js')
const UserRepository = require('../repositories/users.js')
const userRepository = new UserRepository();

exports.verifyJWT = catchAsync(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized request')
    try {
        const decodedToken = await helper.decodeAccessToken(token)
        if (!decodedToken) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid access token')
        }
        //edge case to cover validate user for delete user token
        req.user = {id :decodedToken.id}
        next()
    } catch (error) {
        throw new AppError(StatusCodes.UNAUTHORIZED, error?.message || 'Invalid access token')
    }
});

exports.verifyPermission = catchAsync(async (req, res, next) => {
    const user=await userRepository.fetchUserById(req.user.id)
    if(!user) throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid access token')
    if (user.role === 'admin') {
        next()
    } else {
        throw new AppError(StatusCodes.FORBIDDEN, 'You are not allowed to perform this action')
    }
})

