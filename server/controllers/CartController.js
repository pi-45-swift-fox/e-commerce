const { UserProduct } = require('../models')
const { Product } = require('../models')

class CartController {
  static add(req, res, next) {
    console.log('test controller');
    const payload = {
      userId: req.currentUserId,
      productId: req.body.productId,
      quantity: +req.body.quantity,
      status: false
    }
    UserProduct.findOne({ where: {
      userId: payload.userId,
      productId: payload.productId,
      status: false
    },
    include: [{model: Product}] })
    .then((result) => {
      if(result) {
        let newdata = {
          quantity: result.quantity + payload.quantity
        }
        if (newdata.quantity <= result.Product.stock) {
          return UserProduct.update(newdata, {
            where: {
              id: result.id  
            }
          })
        } else {
          return next({
              name: 'BadRequest',
              errors: [{ message: 'Quantity limit exceed.' }]
            })
        }
      } else {
        console.log('baru');
        return UserProduct.create(payload)
      }
    })
    .then((data) => {
      return res.status(201).json({
        id: data.id,
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity
      })
    })
    .catch((err) => {
      console.log(err)
      return next({
        name: 'InternalServerError',
        errors: [{ msg: 'Failed to Add.' }]
      })
    })
  }

  static findAll(req, res, next) {
    UserProduct.findAll({
        where: { userId: req.currentUserId, status: false },
        include: [{ model: Product }],
        order: [
            ['id', 'DESC']
        ]
      })
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        return next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Show.' }]
        })
      })
  }

  static findOne(req, res, next) {
    UserProduct.findOne({
        where: {
          id: req.params.id
        },
        include: [Product]
      })
      .then((data) => {
        if (data) {
          return res.status(200).json(data)
        } else {
          return next({
            name: 'NotFound',
            errors: [{ msg: 'Data Not Found' }]
          })

        }
      })
      .catch((err) => {
        return next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Show.' }]
        })
      })
  }
  
  static edit(req,res,next) {
    const payload = {
      id: req.params.id,
      quantity: +req.body.quantity
    }
    UserProduct.findOne({where:{ id: payload.id }, include:[ { model: Product } ] })
    .then((data)=>{
        if (newdata.quantity <= result.Product.stock) {
          let newdata = {
                quantity: +data.quantity + (+payload.quantity)
              }
          UserProduct.update(newdata, {
            where: {
              id: data.id
            }
          })
          .then((result) => {
            return res.status(201).json({result})
          })
        } else {
          return next({
            name: 'BadRequest',
            errors: [{ msg: 'Quantity limit exceed.' }]
          })
        }
    })
    .catch((err)=>{
      next(err)
    })
  }

  static delete(req, res, next) {
    console.log('proses delete di server')
    UserProduct.destroy({ where: { id: +req.params.id } })
      .then((result) => {
        return res.status(201).json({ result })
      })
      .catch((err) => {
        return next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Delete.' }]
        })
      })
  }

  static status (req,res,next) {
    const id = req.params.id
    UserProduct.findOne({ where: { id:id },
    include: [{ model: Product }]
    })
    .then(data => {
      let buyout = { stock: data.Product.stock - data.quantity}
      return Product.update(buyout, { where: { id: data.Product.id } })
    })
    .then(data => {
      let buyout = { status: true }
      return UserProduct.update(buyout, {where : { id:id }})
    })
    .then(result =>{
      return res.status(201).json({result})
    })
    .catch(err => {
      next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to status.' }]
        })
    })
  }

  static showstatus (req, res, next) {
    UserProduct.findAll({ where: { userId: req.currentUserId, status: true }, include:[{model: Product}] })
    .then(data => {
      console.log(data)
      return res.status(200).json(data)
    })
    .catch(err =>{
      console.log(err)
      next(err)
    })
  }
}
module.exports = CartController