const AppError = require('./appError.js');
const process = require('process');
const logger = require('./logger.js');

let httpServerRef;
const errorHandler = {
    listenToErrorEvents: (httpServer) => {
        httpServerRef = httpServer;

        process.on('uncaughtException', async (error) => {
            await errorHandler.handleError(error);
        });

        process.on('unhandledRejection', async (reason) => {
            await errorHandler.handleError(reason);
        });

        process.on('SIGTERM', async () => {
            logger.error('App received SIGTERM event, trying to gracefully close the server');
            await terminateHttpServerAndExit();
        });

        process.on('SIGINT', async () => {
            logger.error('App received SIGINT event, trying to gracefully close the server');
            await terminateHttpServerAndExit();
        });
    },

    handleError: async (errorToHandle) => {
        try {
            console.log(errorHandler)
            let appError;
            if (errorToHandle instanceof AppError) {
                logger.debug('Handling AppError:', errorToHandle);
                appError = errorToHandle;
            } else if (errorToHandle instanceof Error) {
                logger.debug('Handling general Error:', errorToHandle);
                appError = new AppError(errorToHandle.name, errorToHandle.message);
                appError.stack = errorToHandle.stack;
            } else if (errorToHandle instanceof mongoose.Error) {
                logger.debug('Handling mongoose Error:', errorToHandle);
                appError = new AppError(errorToHandle.name, errorToHandle.message);
                appError.stack = errorToHandle.stack;
            } else if (errorToHandle instanceof Prisma.PrismaClientValidationError) {
                logger.debug('Handling PrismaClientValidationError:', errorToHandle);
                appError = new AppError('prisma-validation-error', errorToHandle.message);
                appError.errors = errorToHandle.errors;
            } else if (errorToHandle instanceof RedisError) {
                logger.debug('Handling RedisError:', errorToHandle);
                appError = new AppError('redis-error', errorToHandle.message);
                appError.stack = errorToHandle.stack;
            } else {
                logger.debug('Handling unknown error type:', errorToHandle);
                appError = new AppError('UnknownError', 'An unknown error occurred');
            }

            if (!appError.isTrusted) {
                logger.error('Untrusted error, terminating server:', appError);
                await terminateHttpServerAndExit();
            }

            return appError;
        } catch (handlingError) {
            process.stdout.write('The error handler failed. Here are the handler failure and then the origin error that it tried to handle: ');
            process.stdout.write(JSON.stringify(handlingError));
            process.stdout.write(JSON.stringify(errorToHandle));
        }
    }
};

const terminateHttpServerAndExit = async () => {
    if (httpServerRef) {
        await new Promise((resolve) => httpServerRef.close(resolve)); // Graceful shutdown
    }
    process.exit();
};

module.exports = { errorHandler };
