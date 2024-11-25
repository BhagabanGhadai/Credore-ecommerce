const express=require('express');
const productRouter=express.Router();
const productController=require('../controllers/products.js');
const { addProductValidators,updateProductValidators,getProductValidators,getAllProductValidator } = require('../validators/product.js');
const validate = require('../validators/index.js');
const { verifyJWT,verifyPermission } = require('../middlewares/authMiddleware.js');


productRouter.post('/', addProductValidators(), validate,verifyJWT,verifyPermission, productController.createProduct);
productRouter.get('/',getAllProductValidator(), validate,verifyJWT,productController.getAllProducts);
productRouter.get('/:productId',getProductValidators(), validate,verifyJWT, productController.getProduct);
productRouter.patch('/:productId', updateProductValidators(), validate,verifyJWT,verifyPermission, productController.updateProduct);
productRouter.patch('/stock/:productId', updateProductValidators(), validate,verifyJWT,verifyPermission, productController.updateProductStock);
productRouter.delete('/:productId', getProductValidators(), validate,verifyJWT,verifyPermission,productController.deleteProduct);


module.exports=productRouter;