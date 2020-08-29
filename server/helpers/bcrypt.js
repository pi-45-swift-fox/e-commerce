const bcrypt = require('bcrypt')

function encrypt(password) {
    return bcrypt.hashSync(password, +process.env.BERAPAKALI)
}

function compare(passClient, passDb) {
    return bcrypt.compareSync(passClient, passDb)
}

module.exports = { encrypt, compare }