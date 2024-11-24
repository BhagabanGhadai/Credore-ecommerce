const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const configs=require('../configs/index.js');

class LogManager {
    static instance;

/**
 * Initializes a new instance of the LogManager class.
 * Configures the logger with specified logging level, format, and transports.
 * Includes daily rotating file transports for 'error' and 'info' levels.
 * Adds console transport with colored output if not in production environment.
 */
    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            ),
            transports: [
                new transports.DailyRotateFile({
                    level: 'error',
                    filename: 'logs/application-error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                }),
                new transports.DailyRotateFile({
                    level: 'info',
                    filename: `logs/application-%DATE%.log`,
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d'
                })
            ]
        });

        if (configs.NODE_ENV !== 'prod') {
            this.logger.add(
                new transports.Console({
                    format: format.combine(format.colorize(), format.simple())
                })
            );
        }
    }

    getLogger() {
        return this.logger;
    }

    static getInstance() {
        if (!LogManager.instance) {
            LogManager.instance = new LogManager();
        }

        return LogManager.instance;
    }
}

module.exports = LogManager.getInstance().getLogger();


