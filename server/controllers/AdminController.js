const { Admin } = require('../models')
const { generateToken } = require('../helpers/jwt.js')
const {compare} = require('../helpers/bcrypt.js')
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
                console.log('masuk login', process.env.SECRET);
                if (result) {
                    console.log('result ketemu');
                    // console.log(result.password + " " + getdata.password);
                    let decode = compare(getdata.password, result.password)
                    console.log(decode);
                    if (decode) {
                        console.log('berhasil login', generateToken({
                            id:result.id,
                            email: result.email
                        }));
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