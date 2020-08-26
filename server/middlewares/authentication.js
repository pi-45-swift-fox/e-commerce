const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

function authentication(req, res, next) {
    try {
        console.log('auth test user');
        if (req.headers.access_token) {
            let verify = verifyToken(req.headers.access_token)
            req.UserId = verify.id
            User.findByPk(verify.id)
                .then((result) => {
                    if (result) next()
                    else next({ name: 'Unauthenticated' })
                })
                .catch(next)
        } else {
            next({ name: 'Unauthenticated' })
        }
    } catch {
        next({ name: 'Unauthenticated' })
    }
}

module.exports = authentication