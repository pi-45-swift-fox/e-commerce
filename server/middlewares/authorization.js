const { Cart } = require('../models')

function authorization(req, res, next) {
    Cart.findByPk(req.params.id)
        .then((Product) => {
            if (Product) {
                if (Product.userId == req.currentUserId) return next()
                else return next({ name: 'Unauthorized' })
            } else {
                return next({ name: 'NotFound' })
            }
        })
        .catch(next)
}

module.exports = authorization