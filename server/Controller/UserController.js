const {User} = require('../models')
const {JWT, Bcrypt} = require('../helpers')

class UserController{

    static async register(req, res, next){
        try{
            const {email, password} = req.body
            const newUser = await User.create({email,password})
            if(newUser) {
                return res.status(201).json({email:newUser.email, message:"Success Register"})
            }
        }catch(err){
            next(err)
        }
    }

    static async login(req, res, next){
        try{
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if(!user){
                next({errorCode : 'INVALID_USER'})
            }
            else{
                const userPassword = await Bcrypt.decrypt(password, user.password)
                if(!userPassword){
                    next({errorCode : 'INVALID_USER'})
                }
                else{
                    const token = JWT.generateToken(user)
                    res.status(200).json({id:user.id, email:user.email, role:user.role ,token})
                }
            }

        }catch(err){
           
            next(err)

        }
    }
}

module.exports = UserController