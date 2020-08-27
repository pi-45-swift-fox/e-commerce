const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Helper {
    static hashSync(password) {
        const salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT);
        return bcrypt.hashSync(password, salt);
    }

    static compareSync(password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    static sign(obj) {
        return jwt.sign(obj, process.env.JWT_SECRET);
    }

    static verify(token) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}

module.exports = Helper
