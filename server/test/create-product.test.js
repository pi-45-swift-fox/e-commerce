const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
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

let token
let token2
beforeAll(done => {
    User.create(user)
        .then(data => {
            console.log(data.id, '<<<data.id')
            token = jwt.sign({id: data.id}, process.env.SECRET)
            return User.create(user2) 
        })
        .then(data2 => {
            token2 = jwt.sign({id: data2.id}, process.env.SECRET)
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


// CREATE PRODUCT

describe('create Product', () => {
    describe('succes create', () => {
        it ('Return status 201 with data new Product', done => {
            let newProduct = {
                name: 'tongkat sung go kong',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: 100000,
                stock: 20
            }
            request(app)
                .post('/products')
                .set('accesstoken', token)
                .send(newProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name', newProduct.name)
                    done()
                })
        })
    })

    describe('accesstoken is empty', () => {
        it ('Return status 400 with error message', done => {
            let newProduct = {
                name: 'tongkat sung go kong',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: 100000,
                stock: 20
            }
            request(app)
                .post('/products')
                .send(newProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Not Authorized')
                    done()
                })
        })
    })

    // ROLE HARUS DI UBAH SELAIN 'ADMIN'

    describe('Not role admin', () => {
        it ('Return status 401 with message error', done => {
            let newProduct = {
                name: 'tongkat sung go kong',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: 100000,
                stock: 20
            }
            request(app)
                .post('/products')
                .set('accesstoken', token2)
                .send(newProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg', 'Not Authorized')
                    done()
                })
        })
    })

    describe('field required is empty', () => {
        it ('Return status 400 with msg', done => {
            let newProduct = {
                name: '',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: '',
                stock: ''
            }
            request(app)
                .post('/products')
                .set('accesstoken', token)
                .send(newProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', `Name can't be empty,Price can't be empty,Stock can't be empty`)
                    done()
                })
        })
    })

    describe('stock below zero', () => {
        it ('Return status 400 with msg', done => {
            let newProduct = {
                name: 'aaaaa',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: 10000,
                stock: -10
            }
            request(app)
                .post('/products')
                .set('accesstoken', token)
                .send(newProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', `Stock minimum 1`)
                    done()
                })
        })
    })

    describe('price below zero', () => {
        it ('Return status 400 with msg', done => {
            let newProduct = {
                name: 'adfaa',
                image_url: 'https://st2.ancientfacts.net/wp-content/uploads/2016/03/Ruyi-Jingu-Bang-730x410.jpg',
                price: -10000,
                stock: 10
            }
            request(app)
                .post('/products')
                .set('accesstoken', token)
                .send(newProduct)
                .then(response => {
                    const { status, body } = response
                    // console.log(body, '<<<< body');
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', `Price minimum 1`)
                    done()
                })
        })
    })
})

