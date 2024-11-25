const ProductService = require('../services/products');
const StatusCodes = require('http-status-codes');
const ApiResponse = require('../utils/apiResponse');
const { catchAsync } = require('../utils/asyncHandler');

const productService = new ProductService();
module.exports = {
    createProduct : catchAsync(async (req, res) => {
        const product = await productService.createProduct(req.body);
        return res.status(StatusCodes.CREATED).json(new ApiResponse( StatusCodes.CREATED, product));
    }),
    getAllProducts : catchAsync(async (req, res) => {
        const products = await productService.fetchAllProduct(req.query);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, products));
    }),
    getProduct : catchAsync(async (req, res) => {
        const product = await productService.fetchProductByProductId(req.params.productId);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, product));
    }),
    updateProduct : catchAsync(async (req, res) => {
        const product = await productService.updateTheProductStock(req.params.productId, req.body);
        return res.status(StatusCodes.OK).json(new ApiResponse( StatusCodes.OK, product));
    }),
    deleteProduct : catchAsync(async (req, res) => {
        const product = await productService.deleteProductByProductId(req.params.productId);
        return res.status(StatusCodes.NO_CONTENT).json(new ApiResponse( StatusCodes.NO_CONTENT, product));
    })
}