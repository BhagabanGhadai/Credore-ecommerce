const prisma = require('../prisma/client/index.js');
const AppError = require('../utils/appError');
class ProductRepository {
    async createProduct(productData) {
        try {
            return await prisma.product.create({
                data: productData
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async createMultipleProduct(products) {
        try {
            return await prisma.product.createMany({
                data: products,
                skipDuplicates: true
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async fetchAllProduct(filter) {
        try {
            return await prisma.product.findMany(filter)
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async fetchProductByProductId(ProductId) {
        try {
            return await prisma.product.findUnique({
                where: {
                    id: ProductId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async updateTheProductStock(productId, quantity) {
        try {
            return await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    stock: {
                        increment: -quantity
                    }
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async deleteProductByProductId(ProductId) {
        try {
            return await prisma.product.delete({
                where: {
                    id: ProductId
                }
            })
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
}

module.exports = ProductRepository
