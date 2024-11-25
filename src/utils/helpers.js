const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configs = require('../configs/index.js')

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
        return jwt.verify(refreshToken, configs.REFRESH_TOKEN_SECRET)
    }
}
module.exports = Helper

