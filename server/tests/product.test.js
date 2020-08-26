const request = require('supertest');
const app = require('../app');
const { sequelize, Product, User } = require('../models')
const { queryInterface } = sequelize
const { JWT, Bcrypt } = require('../helpers')

const productData = { name: 'Bajuaaaaaaaaaaaaa Saint Michael', image_url: '123456', price: 50000, stock: 10 }
const falseProduct = { name: 'Bajuaaaaaaaaaaaaa Saint Michael', image_url: '123456', price: 50, stock: 'asd' }
let id = ''
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzc2LCJlbWFpbCI6InJhd3pAaG90LmlkIiwiaWF0IjoxNTk4MzMyNjgxfQ.QgTQaiYbWZCmk50ETUL9t2ljrhPCl5VKoIRLvwSVQo8'

beforeAll(() => {
    Product.create(productData)
        .then(product => {
        })
        .catch(err => {
            // console.log(err)
        })
})
// afterAll(()=>{

//     queryInterface.bulkDelete("Products",{})
//     .then(() => done())
//     .catch(err=>{
//       done()
//     })
// })

// POST PRODUCTS
describe("POST /Products case berhasil menambahkan product", function() {
    test('test ADD product berhasil', function(done) {
        request(app)
            .post('/products')
            .send(productData)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("newData", expect.any(Object))
                id = body.newData.id
                done()
            })
    })

    test('test ADD product gagal', function(done) {
        request(app)
            .post('/products')
            .send(falseProduct)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('Message', expect.any(Array))
                done()
            })
    })
})

//SHOW PRODUCT
describe("GET /Products case berhasil menampilkan product", function() {
    test('test SHOW product berhasil', function(done) {
        request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                // console.log(status, ',==================== ini status')
                expect(status).toBe(200)
                expect(body).toHaveProperty("data", expect.any(Array))
                done()
            })
    })

    test('test ADD product gagal', function(done) {
        request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set('access_token', `bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzc3LCJlbWFpbCI6InJhd3pAaG90LmlkIiwiaWF0IjoxNTk3NzY0MTM5fQ.Sg3dYDex8gN_fwdiSw9NlNaRQ`)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('Message', expect.any(Array))
                done()
            })
    })
})

//UPDATE PRODUCT

describe("PUT /Products/:id case berhasil update product", function() {
    test('test UPDATE product berhasil', function(done) {
        request(app)
            .put(`/products/${id}`)
            .set('Accept', 'application/json')
            .send(productData)
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                // console.log(status, ',==================== ini status')
                expect(status).toBe(200)
                expect(body).toHaveProperty("data", expect.any(Array))
                done()
            })
    })

    test('test ADD product gagal', function(done) {
        request(app)
            .post(`/products/${id}`)
            .send(falseProduct)
            .set('Accept', 'application/json')
            .set('access_token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzc3LCJlbWFpbCI6InJhd3pAaG90LmlkIiwiaWF0IjoxNTk3NzY0MTM5fQ.`)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('Message', expect.any(Array))
                done()
            })
    })
})


// DELETE PRODUCT
describe("DELETE /Products/:id case berhasil Delete product", function() {
    test('test Delete product berhasil', function(done) {
        request(app)
            .delete(`/products/${id}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                // console.log(status, ',==================== ini status')
                expect(status).toBe(200)
                expect(body).toHaveProperty("Message", "Data has been destroyed")
                done()
            })
    })

    test('test ADD product gagal', function(done) {
        request(app)
            .delete(`/products/${id}`)
            .set('Accept', 'application/json')
            .set('access_token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzc3LCJlbWFpbCI6InJhd3pAaG90LmlkIiwiaWF0IjoxNTk3NzY0MTM5fQ.`)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('Message', expect.any(Array))
                done()
            })
    })
})