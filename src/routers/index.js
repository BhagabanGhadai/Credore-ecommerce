const logger = require('../utils/logger.js');
const { StatusCodes } = require('http-status-codes');
const userRouter = require('./userRouter.js');
const productRouter = require('./productRouter.js');
const orderRouter = require('./orderRouter.js');
const orderItemRouter = require('./orderItem.js');


function defineRoutes(expressApp) {
    logger.info('Defining routes...');

    expressApp.use('/api/v1/users', userRouter);
    expressApp.use('/api/v1/products', productRouter);
    expressApp.use('/api/v1/orders', orderRouter);
    expressApp.use('/api/v1/orderItems', orderItemRouter);
    // health check
    expressApp.get('/health-check', (_, res) => {
        res.status(StatusCodes.OK).send({ message: 'helath check successful', status: true });
    });
    // 404 handler
    expressApp.use((_, res) => {
        res.status(StatusCodes.NOT_FOUND).send('Api Not Found');
    });
    logger.info('Routes defined');
}

module.exports = { defineRoutes };

