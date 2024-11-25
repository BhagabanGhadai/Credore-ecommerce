const UserRepository = require('../repositories/users.js');
const AppError = require('../utils/appError.js');
const StatusCodes = require('http-status-codes');
const helpers = require('../utils/helpers.js');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async createUser(name, email, password,role) {
        try {
            const userExists = await this.userRepository.fetchUserByEmail(email);
            if (userExists) {
                throw new AppError(StatusCodes.CONFLICT, `User with email - ${email} already exists.`)
            }
            const encryptedPassword = await helpers.generateEncryptedPassword(password);
            const user = await this.userRepository.createUser(name, email, encryptedPassword,role);
            return user;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async genrateTokenOnLogin(email, password) {
        try {
            const user = await this.userRepository.fetchUserByEmail(email);
            if (!user) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
            }
            const isPasswordMatch = await helpers.validateThePassword(password, user.password);
            if (!isPasswordMatch) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
            }
            const token = await helpers.generateAccessAndRefreshTokens(user);            
            return token;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async refreshAccessToken(refreshToken) {
        try {
            const decodedToken = await helpers.decodeRefreshToken(refreshToken);
            if (!decodedToken) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token')
            }
            const accessToken = await helpers.generateAccessToken(decodedToken);
            return accessToken;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async fetchCurrentUser(userId) {
        try {
            const user = await this.userRepository.fetchUserById(userId);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
            }
            return user;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async fetchAllUsers(filter) {
        try {
            const users = await this.userRepository.getAllUser(filter);
            return users;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async updateUserById(userId, updateData) {
        try {
            const user = await this.userRepository.fetchUserById(userId);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
            }
            const updateUser = await this.userRepository.updateUserById(userId, updateData);
            return updateUser;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async deleteUserById(userId) {
        try {
            const user = await this.userRepository.fetchUserById(userId);
            if (!user) {
                throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
            }
            const deletedUser = await this.userRepository.deleteUserById(userId);
            return deletedUser;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async logoutUser(refreshToken,accessToken) {
        try {

        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }


}
module.exports = UserService;