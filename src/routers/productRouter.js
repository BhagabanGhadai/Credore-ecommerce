const express=require('express');
const productRouter=express.Router();
const productController=require('../controllers/products.js');
const { addProductValidators,updateProductValidators } = require('../validators/product.js');
const validate = require('../validators/index.js');

productRouter.get('/',productController.getAllProducts);
productRouter.get('/:productId', productController.getProduct);
productRouter.post('/', addProductValidators(), validate, productController.createProduct);
productRouter.patch('/:productId', updateProductValidators(), validate, productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);


module.exports=productRouter;