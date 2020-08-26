const bcrypt = require('bcrypt')

const salt = bcrypt.genSaltSync(8)

function generate(password) {
    let result = bcrypt.hashSync(password, salt)
    return result
}

function compare(password, hash) {
    let result = bcrypt.compareSync(password, hash)
    return result
}

module.exports = { generate, compare }