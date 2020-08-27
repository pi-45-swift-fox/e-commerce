const { Product } = require('../models')
const { Op } = require("sequelize")
class ProductController {

  static AdminfindAll(req, res, next) {
    Product.findAll({
        order: [
          ['updatedAt', 'DESC']
        ]
      })
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        return next({
          name: 'NotFound',
          errors: [{ msg: 'Data Not Found' }]
        })
      })
  }

  static findAll(req, res, next) {
    Product.findAll({
        where: {
          stock: {
            [Op.gt]: 0
          }
        },
        order: [
          ['updatedAt', 'DESC']
        ]
      })
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        next({
          name: 'NotFound',
          errors: [{ msg: 'Data Not Found' }]
        })
      })
  }

  static findByCategory(req, res, next) {
    const category = req.params.category
    Product.findAll({
        where: {
          category: category,
          stock: {
            [Op.gt]: 0
          }
        }
      })
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        next({
          name: 'NotFound',
          errors: [{ msg: 'Data Not Found' }]
        })
      })
  }

  static findOne(req, res, next) {
    const id = req.params.id
    Product.findOne({
        where: {
          id: id
        }
      })
      .then((data) => {
        return res.status(200).json(data)
      })
      .catch((err) => {
        next({
          name: 'NotFound',
          errors: [{ msg: 'Data Not Found' }]
        })
      })
  }

  static addProduct(req, res, next) {
    console.log('masuk add');
    const payload = {
      name: req.body.name,
      img_url: req.body.img_url,
      stock: +req.body.stock,
      description: req.body.description,
      price: +req.body.price,
      category: req.body.category
    }
    console.log(payload)
    Product.create(payload)
      .then((data) => {
        return res.status(201).json({
          id: data.id,
          name: data.name,
          img_url: data.img_url,
          stock: data.stock,
          description: data.description,
          price: data.price
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static editProduct(req, res, next) {
    const payload = {
      name: req.body.name,
      img_url: req.body.img_url,
      stock: +req.body.stock,
      description: req.body.description,
      price: +req.body.price,
      category: req.body.category
    }
    Product.update(payload, {
        where: {
          id: req.params.id
        }
      })
      .then((data) => {
        return res.status(201).json({
          id: +req.params.id,
          name: req.body.name,
          img_url: req.body.img_url,
          stock: +req.body.stock,
          description: req.body.description,
          price: +req.body.price,
          category: req.body.category
        })
      })
      .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Update.' }]
        })
      })
  }

  static deleteProduct(req, res, next) {
    const id = req.params.id
    Product.destroy({
        where: {
          id: id
        }
      })
      .then((result) => {
        return res.status(201).json({ result })
      })
      .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Delete.' }]
        })
      })
  }

  static editStock (req,res,next) {
    Product.findOne({ where: { id: req.params.id } })
    .then(data => {
      let payload = {
        stock: data.stock + +req.body.stock
      }
      Product.update(payload, {
        where: {
          id: req.params.id
        }
      })
      .then((result) => {
        return res.status(201).json({
          id: data.id,
          name: data.name,
          img_url: data.img_url,
          stock: payload.stock,
          description: data.description,
          price: data.price,
          category: data.category
        })
      })
    })
    .catch((err) => {
        next({
          name: 'InternalServerError',
          errors: [{ msg: 'Failed to Update.' }]
        })
      })
  }
}

module.exports = ProductController