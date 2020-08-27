const { User } = require('../models')
const { encode } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')


class UserController {
    static register (req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        User.create(newUser)
        .then((data) => {
            return res.status(201).json(data)
        })
        .catch((err) => {
            next(err)
        })
    }

    static login (req, res, next) {
        const { email, password } = req.body
        
        User.findOne({
            where: { email } 
        })
        .then((data) => {
            if (!data) {
                throw {status: 400, name: "ErrorValidation", message:"email or password incorrect"}
            } else {
                if (data && checkPassword(password, data.password)) {
                    let {id, name, email, role} = data
                    let access_token = encode({id, name, email, role})
                    res.status(200).json({access_token, name, role})
                } else {
                    throw {status: 400, name: "ErrorValidation", message:"email or password incorrect"}
                }
            }
        })
        .catch((err) => {
            console.log('kenapaya??.>', err);
            next(err)
        })
    }

}

module.exports = UserController