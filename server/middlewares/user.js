const jwt = require('jsonwebtoken');
const { User, Cart } = require('../models');

module.exports = class Check {
    static async Authenticate(req, res, next) {
        try {
            const profile = jwt.verify(req.headers.access_token, process.env.SECRET);

            const data = await User.findOne({
                where: {
                    email: profile.email
                }
            });

            if (data) {
                req.userLogin = data;
                next();
            } else {
                throw 'Unable to find user';
            }
        } catch (error) {
            next({
                code: 403,
                type: 'token'
            })
        }
    }

    static async authorize_admin(req, res, next) {
        if (req.userLogin.role === 'admin') {
            next();
        } else {
            next({
                code: 403,
                type: 'token'
            });
        }
    }

    static async authorize_cart_owner(req, res, next) {
        const cart = await Cart.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['UserId']
        });

        if (cart) {
            if (req.userLogin.id === cart.UserId) {
                next();
            } else {
                next({
                    code: 403,
                    type: 'token'
                });
            }
        } else {
            next({
                code: 404,
                type: 'cart'
            });
        }

    }
};