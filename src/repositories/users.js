const prisma = require('../prisma/client/index.js');
const AppError = require('../utils/appError');
class UserRepository {
    async createUser(name, email, password,role) {
        try {
            return await prisma.user.create({
                data: {
                    name,email,password,role
                }
            });
        } catch (error) {
            throw new AppError(error.code, error.message, error)
        }
    }
    async fetchUserByEmail(email) {
        try {
            return await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
        } catch (error) {
            throw new AppError(error.code, error.message, error)
        }
    }
    async fetchUserById(userId) {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
        } catch (error) {
            throw new AppError(error.code, error.message, error)
        }
    }
    async deleteUserById(userId) {
        try {
            return await prisma.user.delete({
                where: {
                    id: userId
                }
            });
        } catch (error) {
            throw new AppError(error.code, error.message, error)
        }
    }
    async updateUserById(userId,updateData) {
        try {
            return await prisma.user.update({
                where: {
                    id: userId
                },
                data:updateData
            });
        } catch (error) {
            throw new AppError(error.code, error.message, error)
        }
    }
    async getAllUser(filter) {
        try {
            return await prisma.user.findMany(filter);
        } catch (error) {
            throw new AppError(error.code, error.message, error)
        }
    }
}

module.exports = UserRepository;
