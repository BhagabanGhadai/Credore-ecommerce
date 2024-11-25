const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configs = require('../configs/index.js')
const redis = require('../utils/cache')

class Helper {

    static async generateEncryptedPassword(password) {
        return await bcrypt.hash(password, Number(configs.SALT_ROUND))
    }
    static async validateThePassword(enteredPassword, savedPassword) {
        return await bcrypt.compare(enteredPassword, savedPassword)
    }
    static async generateAccessToken(user) {
        return jwt.sign(
            {
                id: user.id,
                iat: Date.now() / 1000
            },
            configs.JWT_ACCESS_SECRET,
            { expiresIn: configs.JWT_ACCESS_EXPIRES }
        )
    }
    static async generateRefreshToken(user) {
        return jwt.sign(
            {
                id: user.id,
                iat: Date.now() / 1000
            },
            configs.JWT_REFRESH_SECRET,
            { expiresIn: configs.JWT_REFRESH_EXPIRES }
        )
    }
    static async generateAccessAndRefreshTokens(user) {
        const accessToken = await this.generateAccessToken(user)
        const refreshToken = await this.generateRefreshToken(user)

        return { accessToken, refreshToken }
    }
    static async decodeAccessToken(accessToken) {
        return jwt.verify(accessToken, configs.JWT_ACCESS_SECRET)
    }
    static async decodeRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, configs.JWT_REFRESH_SECRET)
    }
    static async blacklistToken(refreshToken, accessToken) {
        const decodedRefreshToken = await this.decodeRefreshToken(refreshToken);
        const decodedAccessToken = await this.decodeAccessToken(accessToken);
        const refreshTokenExpiresIn = decodedRefreshToken.exp * 1000 - Date.now();
        const accessTokenExpiresIn = decodedAccessToken.exp * 1000 - Date.now();

        if (accessTokenExpiresIn > 0) {
            await redis.set(`access:blacklist:${accessToken}`, accessToken, 'PX', accessTokenExpiresIn);
        }
        if (refreshTokenExpiresIn > 0) {
            await redis.set(`refresh:blacklist:${refreshToken}`, refreshToken, 'PX', refreshTokenExpiresIn);
        }
    }
    static async isAccessTokenBlacklisted(accessToken) { 
        const blacklistedAccessToken = await redis.get(`access:blacklist:${accessToken}`);
        return blacklistedAccessToken !== null
    }
    static async isRefreshTokenBlacklisted(refreshToken) {
        const blacklistedRefreshToken = await redis.get(`refresh:blacklist:${refreshToken}`);
        return blacklistedRefreshToken !== null
    }
}
module.exports = Helper

