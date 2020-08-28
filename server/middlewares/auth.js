const { decode } = require('../helpers/jwt')
const { User, Cart } = require('../models')

class Auth {
  static async authentication(req, res, next) {
    const access_token = req.headers.access_token
    if (!access_token) {
      return res.status(400).json({ message: 'Token not found' })
    } else {
      try {
        const userData = decode(access_token)
        const user = await User.findOne({ where: { email: userData.email } })
        if (user) {
          req.userData = { email: user.email, role: user.role, id: user.id }
          next()
        } else {
          return res.status(401).json({ message: 'invalid Token' })
        }
      } catch (error) {
        console.log(error, '<<<<<<')
        return res.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }
  static authorizationAdmin(req, res, next) {
    if (req.userData.role === 'admin') {
      // console.log('<<<<<<<<<<<<')
      next()
    } else {
      res.status(400).json({ message: 'Hanya admin yang boleh meng akses' })
    }
  }
  static async authorizationUser(req, res, next) {
    const idCart = req.params.id
    try {
      const check = await Cart.findOne({
        where: {
          id: idCart
        }
      })
      if (check) {
        if (check.UserId === req.userData.id) {
          next()
        } else {
          res.status(401).json({ message: "forbidden access" })
        }
      } else {
        res.status(401).json({ message: "invalid cart" })
      }
    } catch (error) {
      console.log(error, '<<<<<<')
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}



module.exports = Auth