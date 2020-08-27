const jwt = require('jsonwebtoken')

let SECRET = process.env.SECRET

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET)
}

const verifyToken = (token) => {
    return jwt.verify(token, SECRET)
}

module.exports = { generateToken, verifyToken }