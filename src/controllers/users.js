const UserService = require('../services/users');
const StatusCodes = require('http-status-codes');
const ApiResponse = require('../utils/apiResponse');
const { catchAsync } = require('../utils/asyncHandler');

const userService = new UserService();
module.exports ={

    createUser : catchAsync(async (req, res) => {
        const { name, email, password, role } = req.body;
        const user = await userService.createUser(name, email, password,role);
        return res.status(StatusCodes.CREATED).json(new ApiResponse( StatusCodes.CREATED, user));
    }),

    login : catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const token = await userService.genrateTokenOnLogin(email, password);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, token));
    }),

    refreshAccessToken : catchAsync(async (req, res) => {
        const { refreshToken,accessToken } = req.body;
        const accessTokenGeneration = await userService.refreshAccessToken(refreshToken,accessToken);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, accessTokenGeneration));
    }),
    updateUser: catchAsync(async (req, res) => {
        const { userId } = req.params;
        const updateData = req.body;
        const user = await userService.updateUserById(userId, updateData);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, user));
    }),
     getCurrentUser : catchAsync(async (req, res) => {
        const { userId } = req.params;
        const user = await userService.fetchCurrentUser(userId);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, user));
    }),
    getAllUsers : catchAsync(async (req, res) => {
        let filter = {
            include:{
                orders:true
            }
        }
        if (req.query.search) {
            filter.where = {
                ...filter.where,
                OR:[
                    {
                        name: {
                            contains: req.query.search,
                            mode: 'insensitive'
                        } 
                    },
                    {
                        email: {
                            contains: req.query.search,
                            mode: 'insensitive'
                        } 
                    }
                ]
            };
        }
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        const skip = (page - 1) * pageSize;
        filter.skip = skip;
        filter.take = pageSize;
 
        const users = await userService.fetchAllUsers(filter);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, users));
    }),
    deleteUser : catchAsync(async (req, res) => {
        const { userId } = req.params;
        const deleteUser = await userService.deleteUserById(userId);
        return res.status(StatusCodes.NO_CONTENT).json(new ApiResponse( StatusCodes.NO_CONTENT, deleteUser));
    }),
    logout : catchAsync(async (req, res) => {
        const { refreshToken,accessToken } = req.body;
        await userService.logoutUser(refreshToken,accessToken);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, null, 'Logged out successfully'));
    })
}
