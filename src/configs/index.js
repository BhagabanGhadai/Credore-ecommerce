const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT||8080,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
    NODE_ENV: process.env.NODE_ENV,
    SALT_ROUND: process.env.SALT_ROUND
};
