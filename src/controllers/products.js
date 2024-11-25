const ProductService = require('../services/products');
const StatusCodes = require('http-status-codes');
const ApiResponse = require('../utils/apiResponse');
const { catchAsync } = require('../utils/asyncHandler');
const { update } = require('lodash');

const productService = new ProductService();
module.exports = {
    createProduct : catchAsync(async (req, res) => {
        const product = await productService.createProduct(req.body);
        return res.status(StatusCodes.CREATED).json(new ApiResponse( StatusCodes.CREATED, product));
    }),
    getAllProducts : catchAsync(async (req, res) => {
        let filter = {
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
                    }
                ]
            };
        }
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
    
        const skip = (page - 1) * pageSize;
        filter.skip = skip;
        filter.take = pageSize;
        const products = await productService.fetchAllProduct(filter);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, products));
    }),
    getProduct : catchAsync(async (req, res) => {
        const product = await productService.fetchProductByProductId(req.params.productId);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, product));
    }),
    updateProduct : catchAsync(async (req, res) => {
        const product = await productService.updateProductByProductId(req.params.productId, req.body);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, product));
    }),
    updateProductStock : catchAsync(async (req, res) => {
        const product = await productService.updateTheProductStock(req.params.productId, req.body.quantity);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, product));
    }),
    deleteProduct : catchAsync(async (req, res) => {
        const product = await productService.deleteProductByProductId(req.params.productId);
        return res.status(StatusCodes.NO_CONTENT).json(new ApiResponse( StatusCodes.NO_CONTENT, product));
    })
}