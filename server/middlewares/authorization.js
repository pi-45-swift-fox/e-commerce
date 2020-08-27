const { UserProduct } = require('../models')

function authorization(req, res, next) {
  console.log('authorization process')
  console.log(req.params.id);
  UserProduct.findOne({
      where: {
        id: +req.params.id
      }
    })
    .then((data) => {
      console.log(data.userId);
        if (data.userId == req.currentUserId) next()
        else next({ name: 'Unauthorized' })
    })
    .catch(next)
}

module.exports = authorization