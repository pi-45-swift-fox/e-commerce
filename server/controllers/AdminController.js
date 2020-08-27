const { Admin } = require('../models')
const { generateToken } = require('../helpers/jwt.js')
const comparePassword = require('../helpers/bcrypt.js').comparePassword
class AdminController {
  static login(req, res, next) {
    const getdata = {
      email: req.body.email,
      password: req.body.password
    }
    Admin.findOne({
        where: {
          email: getdata.email
        }
      })
      .then((result) => {
        console.log('masuk login');
        if (result) {
          console.log('result ketemu');
          let decode = comparePassword(getdata.password, result.password)
          console.log(decode);
          if (decode) {
            console.log('berhasil login');
            let payload = {
              id: result.id,
              email: result.email
            }
            let access_token = generateToken(payload)
            return res.status(200).json({
              id: payload.id,
              email: payload.email,
              access_token,
              isAdmin: result.isAdmin
            })
          } else {
            next({
              name: 'BadRequest',
              errors: [{ message: 'Invalid Email/Password' }]
            })
          }
        } else {
          next({
            name: 'BadRequest',
            errors: [{ message: 'Invalid Email/Password' }]
          })
        }
      })
      .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ message: err }]
        })
      })
  }
}

module.exports = AdminController