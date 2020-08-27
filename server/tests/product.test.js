const request = require('supertest')
const {sequelize} = require('../models')
const app = require('../app')
const Helper = require('../helpers/Helper')
const {queryInterface} = sequelize

let adminToken = Helper.sign({id: 1, email: 'admin@mail.com'})
let nonAdminToken = Helper.sign({id: 2, email: 'user@mail.com'})
let productId;

const validProduct = {name: 'apollo shirt', image_url: 'https://apollo-singapore.akamaized.net/v1/files/8z37rbm8bo4e2-ID/image;s=850x0', price: 120000, stock: 3}
const invalidProductField = {name: '', image_url: '', price: 120000, stock: 3}
const invalidProductMinus = {name: 'apollo shirt', image_url: 'https://apollo-singapore.akamaized.net/v1/files/8z37rbm8bo4e2-ID/image;s=850x0', price: 120000, stock: -1}

// add product
describe('POST /products', () => {
    it('test add product success', (done) => {
        request(app)
        .post('/products')
        .send(validProduct)
        .set('Accept', 'application/json')
        .set('access_token', adminToken)
        .then(response => {
            const {status, body} = response

            productId = body.id
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', 'apollo shirt')
            expect(body).toHaveProperty('image_url', 'https://apollo-singapore.akamaized.net/v1/files/8z37rbm8bo4e2-ID/image;s=850x0')
            expect(body).toHaveProperty('price', 120000)
            expect(body).toHaveProperty('stock', 3)
            done()
        })
    })
    
    it('test add product no token', (done) => {
        request(app)
        .post('/products')
        .send(validProduct)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'authentication or aithorization failed')
            expect(body).toHaveProperty('errorCode', 'FORBIDDEN')
            done()
        })
    })
    
    it('test add product not admin token', (done) => {
        request(app)
        .post('/products')
        .send(validProduct)
        .set('Accept', 'application/json')
        .set('access_token', nonAdminToken)
        .then(response => {
            const {status, body} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'authentication or aithorization failed')
            expect(body).toHaveProperty('errorCode', 'FORBIDDEN')
            done()
        })
    })

    it('test add product failed empty name and/or image_url', (done) => {
        request(app)
        .post('/products')
        .send(invalidProductField)
        .set('Accept', 'application/json')
        .set('access_token', adminToken)
        .then(response => {
            const {status, body} = response

            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'product name must not empty, image_url must not empty')
            expect(body).toHaveProperty('errorCode', 'VALIDATION_ERROR')
            done()
        })
    })

    it('test add product minus stock value', (done) => {
        request(app)
        .post('/products')
        .send(invalidProductMinus)
        .set('Accept', 'application/json')
        .set('access_token', adminToken)
        .then(response => {
            const {status, body} = response

            expect(status).toBe(400)
            expect(body).toHaveProperty('message', '1 or more stock required')
            expect(body).toHaveProperty('errorCode', 'VALIDATION_ERROR')
            done()
        })
    })
})

// update product
describe('PUT /products', () => {
    it('test edit product no token', (done) => {
        request(app)
        .put('/products')
        .send(validProduct)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'authentication or aithorization failed')
            expect(body).toHaveProperty('errorCode', 'FORBIDDEN')
            done()
        })
    })

    it('test edit product not admin token', (done) => {
        request(app)
        .put('/products')
        .send(validProduct)
        .set('Accept', 'application/json')
        .set('access_token', nonAdminToken)
        .then(response => {
            const {status, body} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'authentication or aithorization failed')
            expect(body).toHaveProperty('errorCode', 'FORBIDDEN')
            done()
        })
    })

    it('test edit product minus stock value', (done) => {
        request(app)
        .put('/products')
        .send(invalidProductMinus)
        .set('Accept', 'application/json')
        .set('access_token', adminToken)
        .then(response => {
            const {status, body} = response

            expect(status).toBe(400)
            expect(body).toHaveProperty('message', '1 or more stock required')
            expect(body).toHaveProperty('errorCode', 'VALIDATION_ERROR')
            done()
        })
    })
})

// read products
describe('GET /products', () => {
    it('test read products no token', (done) => {
        request(app)
        .get('/products')
        .send(validProduct)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'authentication or aithorization failed')
            expect(body).toHaveProperty('errorCode', 'FORBIDDEN')
            done()
        })
    })

    it('test read products not admin token', (done) => {
        request(app)
        .get('/products')
        .send(validProduct)
        .set('Accept', 'application/json')
        .set('access_token', nonAdminToken)
        .then(response => {
            const {status, body} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'authentication or aithorization failed')
            expect(body).toHaveProperty('errorCode', 'FORBIDDEN')
            done()
        })
    })
})

// delete product
describe('GET /products', () => {
    it('test delete product no token', (done) => {
        request(app)
        .delete(`/products/${productId}`)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'authentication or aithorization failed')
            expect(body).toHaveProperty('errorCode', 'FORBIDDEN')
            done()
        })
    })

    it('test delete product not admin token', (done) => {
        request(app)
        .delete(`/products/${productId}`)
        .set('Accept', 'application/json')
        .set('access_token', nonAdminToken)
        .then(response => {
            const {status, body} = response

            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'authentication or aithorization failed')
            expect(body).toHaveProperty('errorCode', 'FORBIDDEN')
            done()
        })
    })
})

afterAll(() => {
    queryInterface.bulkDelete('Products', null, {})
        .then(() => {

        })
        .catch(err=>{

        })
})
