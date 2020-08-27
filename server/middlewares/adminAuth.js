const { Admin } = require('../models')
const { verifyToken } = require('../helpers/jwt')

function Auth(req, res, next) {
  try {
    console.log('auth test admin');
    if (req.headers.access_token) {
      let verify = verifyToken(req.headers.access_token)
      console.log(verify);
      req.currentUserId = verify.id
      Admin.findOne({
          where: {
            id: req.currentUserId
          }
        })
        .then((result) => {
          if (result) {
            console.log('sukses');
            next()
          } else next({ name: 'Unauthenticated' })
        })
        .catch(next)
    } else {
      next({ name: 'Unauthenticated' })
    }
  } catch {
    next({ name: 'Unauthenticated' })
  }
}

module.exports = Auth