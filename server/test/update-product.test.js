const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let user = {
    email: 'admin@mail.com',
    password: '1234',
    role: 'admin' 
}

let user2 = { // role bukan admin
    email: 'admin@mail.com',
    password: '1234',
    role: 'customer' 
}

let product = {
    name: 'tongkat sung go kong',
    image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
    price: 20000,
    stock: 10
}

let token
let idProduct
beforeAll(done => {
    User.create(user)
        .then(data => {
            console.log(data.id, '<<<data.id')
            token = jwt.sign({id: data.id}, process.env.SECRET)
            return User.create(user2)
        })
        .then(data2 => {
            token2 = jwt.sign({id: data2.id}, process.env.SECRET)
            return Product.create(product)
        })
        .then(dataProduct => {
            idProduct = dataProduct.id
            done()
        })
})

afterAll((done) => {
    return queryInterface.bulkDelete('Products')
        .then(() => {
            return queryInterface.bulkDelete('Users')
        })
        .then(() => {
            done()
        })
})


// UPDATE PRODUCT

describe('update Product', () => {
    describe('succes update', () => {
        it ('Return status 200 with message', done => {
            let editProduct = {
                name: 'topi sung go kong',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: 100000,
                stock: 20
            }
            request(app)
                .put(`/products/${idProduct}`)
                .set('accesstoken', token)
                .send(editProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('msg', 'product update')
                    done()

                })
        })
    })

    describe('accesstoken is empty', () => {
        it ('Return status 400 with message', done => {
            let editProduct = {
                name: 'topi sung go kong',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: 100000,
                stock: 20
            }
            request(app)
                .put(`/products/${idProduct}`)
                .send(editProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Not Authorized')
                    done()
                })
        })
    })

    describe('role is not admin', () => {
        it ('Return status 401 with message', done => {
            let editProduct = {
                name: 'topi sung go kong',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: 100000,
                stock: 20
            }
            request(app)
                .put(`/products/${idProduct}`)
                .set('accesstoken', token2)
                .send(editProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Not Authorized')
                    done()
                })
        })
    })

    describe('stock below zero', () => {
        it ('Return status 400 with msg', done => {
            let editProduct = {
                name: 'topi sung go kong',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: 100000,
                stock: -20
            }
            request(app)
                .put(`/products/${idProduct}`)
                .set('accesstoken', token)
                .send(editProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', `Stock minimum 1`)
                    done()
                })
        })
    })
})