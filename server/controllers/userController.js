const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {
    static async register(req, res, next){
        try {
            const { email, password } = req.body
            const newUser = await User.create({
                email,
                password
            })
            res.status(201).json(`user with email ${newUser.email} created`)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const { email, password } = req.body
            const userLogin = await User.findOne({
                where: {
                    email
                }
            })
            const verified = bcrypt.compareSync(password, userLogin.password)
            if(verified){
                const access_token = jwt.sign({email: userLogin.email}, process.env.JWT_SECRET)
                res.status(200).json({email: userLogin.email, access_token})
            } else {
                next({name: 'Error Not Found',message: 'Email atau password salah'})
            }
        } catch (error) {
            next({name: 'Error Not Found',message: 'Email atau password salah'})
        }
    }
}

module.exports = userController