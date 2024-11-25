const ProductRepository = require('../repositories/products');
const AppError = require('../utils/appError');
const StatusCodes = require('http-status-codes');

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(productData) {
        try {
            const product = await this.productRepository.createProduct(productData);
            return product;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }

    async fetchAllProduct(filter) {  
        try {   
            const product = await this.productRepository.fetchAllProduct(filter);
            return product;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async fetchProductByProductId(ProductId) {
        try {
            const product = await this.productRepository.fetchProductByProductId(ProductId);
            if (!product) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Product not found')
            }
            return product;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async deleteProductByProductId(ProductId) {
        try {
            const product = await this.productRepository.fetchProductByProductId(ProductId);
            if (!product) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Product not found')
            }
            const deleteProduct = await this.productRepository.deleteProductByProductId(ProductId);
            return deleteProduct;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async updateProductByProductId(ProductId, productData) {
        try {
            const product = await this.productRepository.fetchProductByProductId(ProductId);
            if (!product) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Product not found')
            }
            const updateProduct = await this.productRepository.updateProductByProductId(ProductId, productData);
            return updateProduct;
        } catch (error) {
            throw new AppError(error.statusCode, error.message, error)
        }
    }
    async updateTheProductStock(productId, quantity) {
        try {
            const product = await this.productRepository.fetchProductByProductId(productId);
            if (!product) {
                throw new AppError(StatusCodes.NOT_FOUND, 'Product not found')
            }
            if (product.stock < quantity) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Insufficient stock')
            }
            console.log(productId, quantity)
            const updateProduct = await this.productRepository.updateTheProductStock(productId, quantity);
            return updateProduct;
        } catch (error) {        
            throw new AppError(error.statusCode, error.message, error)
        }
    }
}

module.exports = ProductService;