const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {

    static async register(req, res, next) {
        try {
            const {email, password} = req.body
            const role = 'user'
            const addUser = await User.create({
                email,
                password,
                role
            })
            if(addUser) {
                let access_token = jwt.sign({id:addUser.id, email:addUser.email, role:addUser.role}, process.env.JWT_SECRET)
                res.status(201).json({access_token})
            }
        }  catch (err) {
            next(err)
        }
    }


    static async loginUser(req,res,next) {
        const {email, password} = req.body
        const findUser = await User.findOne({
            where: {
                email
            }
        })
        if(findUser.role === 'user') {
            const checkPassword = bcrypt.compareSync(password, findUser.password)
            if(checkPassword) {
                let access_token = jwt.sign({id:findUser.id, email:findUser.email}, process.env.JWT_SECRET)
                res.status(200).json({access_token})
            } else {
                next({errCode:'INVALID_ACCOUNT'})
            }
        } else {
            next({errCode:'INVALID_ACCOUNT'})
        }
    }

    static async login(req,res,next){
        try{
            const {email, password} = req.body
            const findUser = await User.findOne({
                where: {
                    email
                }
            })
            if(findUser.role === 'admin') {
                const checkPassword = bcrypt.compareSync(password, findUser.password)
                if(checkPassword) {
                    let access_token = jwt.sign({id:findUser.id, email:findUser.email}, process.env.JWT_SECRET)
                    res.status(200).json({access_token})
                } else {
                    next({errCode:'INVALID_ACCOUNT'})
                }
            } else {
                next({errCode:'INVALID_ACCOUNT'})
            }

        } catch(err) {
            next(err)
        }

    }
}

module.exports = UserController