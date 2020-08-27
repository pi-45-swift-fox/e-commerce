const { Admin } = require('../models')
const { verifyToken } = require('../helpers/jwt')

function adminauthentication(req, res, next) {
    try {
        console.log('auth test admin');
        if (req.headers.access_token) {
            let verify = verifyToken(req.headers.access_token)
            console.log(verify.id);
            req.UserId = verify.id
            Admin.findByPk(verify.id)
                .then((result) => {
                    console.log(result, '<<');
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

module.exports = adminauthentication