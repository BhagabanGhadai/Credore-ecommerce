const util = require('util');
const { AppError } = require('./appError.js');
const process = require('process');
const logger = require('./logger.js');

let httpServerRef;
const errorHandler = {
    listenToErrorEvents: (httpServer) => {
        httpServerRef = httpServer;

        process.on('uncaughtException', async (error) => {
            await errorHandler.handleError(error)
        });

        process.on('unhandledRejection', async (reason) => {
            await errorHandler.handleError(reason)
        });

        process.on('SIGTERM', async () => {
            logger.error('App received SIGTERM event, try to gracefully close the server')
            await terminateHttpServerAndExit()
        });

        process.on('SIGINT', async () => {
            logger.error('App received SIGINT event, try to gracefully close the server')
            await terminateHttpServerAndExit()
        })
    },

    handleError: async (errorToHandle) => {
        try {
            const appError = normalizeError(errorToHandle)
            if (!appError.isTrusted) {
                terminateHttpServerAndExit()
            }
            return appError
        } catch (handlingError) {
            // No console here since it might have failed
            process.stdout.write('The error handler failed. Here are the handler failure and then the origin error that it tried to handle: ')
            process.stdout.write(JSON.stringify(handlingError))
            process.stdout.write(JSON.stringify(errorToHandle))
        }
    },
    handleRabbitMqError: async (error) => {
        if (error.code === 'ECONNREFUSED') {
            logger.error('RabbitMQ connection refused, try to reconnect')
            process.exit(1);
        } 
    },
    handlePrismaError: async (error) => {
        if (error.code === 'P2001') {
            logger.error('Prisma connection refused, try to reconnect')
            process.exit(1);
        }
    },
    handleRedisError: async (error) => {
        if (error.code === 'ECONNREFUSED') {
            logger.error('Redis connection refused, try to reconnect')
            process.exit(1);
        }
    }
}

const terminateHttpServerAndExit = async () => {
    if (httpServerRef) {
        await new Promise((resolve) => httpServerRef.close(resolve)) // Graceful shutdown
    }
    process.exit()
}

// The input might won't be 'AppError' or even 'Error' instance, the output of this function will be - AppError.
const normalizeError = (errorToHandle) => {
    if (errorToHandle instanceof AppError) {
        return errorToHandle
    }
    if (errorToHandle instanceof Error) {
        const appError = new AppError(errorToHandle.name, errorToHandle.message)
        appError.stack = errorToHandle.stack
        return appError
    }
    if (errorToHandle instanceof mongoose.Error) {
        const appError = new AppError(errorToHandle.name, errorToHandle.message)
        appError.stack = errorToHandle.stack
        return appError
    }
    if (errorToHandle instanceof Prisma.PrismaClientValidationError) {
        const appError = new AppError('prisma-validation-error', errorToHandle.message)
        appError.errors = errorToHandle.errors
        return appError
    }
    if (errorToHandle instanceof RedisError) {
        const appError = new AppError('redis-error', errorToHandle.message)
        appError.stack = errorToHandle.stack
        return appError
    }

    const inputType = typeof errorToHandle
    return new AppError(
        'general-error',
        `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(errorToHandle)}`
    )
}

module.exports = { errorHandler, normalizeError }

