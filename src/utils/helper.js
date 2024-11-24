const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configs = require('../configs/index.js')

class Helper {

    static async generateEncryptedPassword(password) {
        return await bcrypt.hash(password, configs.SALT_ROUND)
    }
    static async validateThePassword(enteredPassword, savedPassword) {
        return await bcrypt.compare(enteredPassword, savedPassword)
    }
    static async generateAccessToken(user) {
        return jwt.sign(
            {
                id: user._id,
                iat: Date.now() / 1000
            },
            configs.ACCESS_TOKEN_SECRET,
            { expiresIn: configs.ACCESS_TOKEN_EXPIRY }
        )
    }
    static async generateRefreshToken(user) {
        return jwt.sign(
            {
                id: user._id,
                iat: Date.now() / 1000
            },
            configs.REFRESH_TOKEN_SECRET,
            { expiresIn: configs.REFRESH_TOKEN_EXPIRY }
        )
    }
    static async generateAccessAndRefreshTokens(user) {
        const accessToken = await this.generateAccessToken(user)
        const refreshToken = await this.generateRefreshToken(user)

        return { accessToken, refreshToken }
    }
    static async decodeAccessToken(accessToken) {
        return jwt.verify(accessToken, configs.ACCESS_TOKEN_SECRET)
    }
    static async decodeRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, configs.REFRESH_TOKEN_SECRET)
    }
}
module.exports = Helper

