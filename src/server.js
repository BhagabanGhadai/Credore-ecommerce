const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const config = require('./configs/index.js');
const logger = require('./utils/logger.js');
// const { defineRoutes } = require('./routes/index.js');
// const { verifyToken } = require('./middlewares/authMiddleware.js');
const { errorHandler } = require('./utils/errorHandler.js');
const { ErrorHandlingMiddleware } = require('./middlewares/globalErrorHandlerMiddleware.js');

/* express application with all global level middleware */
const createExpressApp = () => {
    const expressApp = express();
    expressApp.use(
        cors({
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
            // origin: [config.FRONTEND_URL],
            origin: '*',
            credentials: true
        })
    );
    expressApp.use(helmet());
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));

    // Apply compression middleware with custom configuration
    // expressApp.use(
    //     compression({
    //         level: 6,
    //         threshold: 0,
    //         filter: (req, res) => {
    //             if (!req.headers['x-no-compression']) {
    //                 return compression.filter(req, res);
    //             }
    //             return false; // Don't apply compression if 'x-no-compression' header is present
    //         }
    //     })
    // );
    // Log an info message for each incoming request
    expressApp.use(morgan('dev'));
    // expressApp.use(verifyToken);
    //passing app into appRouter
    // defineRoutes(expressApp);
    //global error handling middleware
    ErrorHandlingMiddleware(expressApp);
    return expressApp;
};

/* start the server */
async function startServer() {
    //starting the server
    const httpServer = createExpressApp();
    //listen the server
    const appAddress = await listenServer(httpServer);
    logger.info(`Server is running on ${appAddress.address}:${appAddress.port}`);

}

/*listen the server*/
async function listenServer(expressApp) {
    const serverPort = config.PORT;
    const connection = await expressApp.listen(serverPort);
    errorHandler.listenToErrorEvents(connection);
    return connection.address();
}

module.exports = { startServer };

