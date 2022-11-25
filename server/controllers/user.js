const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = class UserController {
    static async login(req, res, next) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user) {
                const password_check = await bcrypt.compare(req.body.password, user.password);

                if (password_check) {
                    const token = jwt.sign({
                        email: user.email
                    }, process.env.SECRET);

                    res.status(200).json({
                        token
                    });
                } else {
                    throw 'Wrong password';
                }
            } else {
                throw 'No email found';
            }
        } catch (error) {
            next({
                code: 401,
                type: 'login',
                body: error
            });
        }
    }

    static async register(req, res, next) {
        const input = {
            email: req.body.email,
            password: req.body.password,
            role: (req.body.role || 'user')
        };

        try {
            const check = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (check) {
                next({
                    code: 409,
                    type: 'user'
                });
            } else {
                await User.create(input);

                res.status(201).json({
                    msg: 'User Registered'
                });
            }
        } catch (error) {
            next({
                code: 500,
                type: 'user',
                body: error
            });
        }
    }
};