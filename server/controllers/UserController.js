const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
class UserController {

  static register(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar
    }
    User.create(payload)
      .then((result) => {
        let newUser = {
          id: result.id,
          email: result.email
        }
        let access_token = generateToken(newUser)
        res.status(201).json({
          id: result.id,
          email: result.email,
          access_token: access_token
        })
      }).catch((err) => {
        next(err)
      });
  }

  static login(req, res, next) {
    let payload = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
        where: {
          email: payload.email
        }
      })
      .then((data) => {
        if (data) {
          let decrypted = comparePassword(payload.password, data.password)
          if (decrypted) {
            let userdata = {
              id: data.id,
              email: data.email
            }
            let access_token = generateToken(userdata)
            return res.status(200).json({
              id: data.id,
              email: data.email,
              access_token
            })
          } else {
            return next({
              name: 'BadRequest',
              errors: [{ message: 'Invalid Email/Password' }]
            })
          }
        } else {
          return next({
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

  static findUser(req, res, next) {
    const id = req.currentUserId
    User.findOne({
        where: {
          id: id
        }
      })
      .then((data) => {
        return res.status(200).json({ data })
      })
      .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ message: err }]
        })
      })
  }

  static updateBalance(req, res, next) {
    const id = req.currentUserId
    User.update({ balance: req.body.balance }, {
        where: {
          id: id
        }
      })
      .then((data) => {
        return res.status(201).json({ data })
      })
      .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Update.' }]
        })
      })
  }

}

module.exports = UserController