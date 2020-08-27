const request = require('supertest')
const app = require('../app.js')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
let id = ''
let access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5Nzc1OTgwNn0.feDKfr2Emvp-__bLnCHsfgIPWWVPRNlE_gvM7cNqkw4'

beforeAll(() => {
    queryInterface.bulkDelete('Products', {})
    .then(() => console.log('done'))
    .catch(err => console.log(err))
})

describe('POST /products created successfully', ()=>{
    it('test create product successfully will return id, name, price', (done)=>  {
        request(app)
        .post('/products')
        .send({
            name: 'Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112',
            image_url: 'https://cf.shopee.co.id/file/eceb3abc88b0b819cf8d6fa57d107469',
            price: 395200,
            stock : 5
        })
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            id = response.body.id
            expect(response.status).toBe(201)
            expect(response).toHaveProperty('body', expect.any(Object))
            done()
        })
    })
})

describe('POST /products create failed', ()=>{
    it('test input error, failed create product will return message', (done)=>  {
        request(app)
        .post('/products')
        .send({
            name: '',
            image_url: '',
            price: 0,
            stock : 0
        })
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const { body } = response
            expect(response.status).toBe(400)
            expect(body).toHaveProperty('message', expect.any(Array))
            done()
        })
    })

    it('test failed create product without access_token, will return message', (done)=>  {
        request(app)
        .post('/products')
        .send({
            name: 'Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112',
            image_url: 'https://cf.shopee.co.id/file/eceb3abc88b0b819cf8d6fa57d107469',
            price: 395200,
            stock : 5
        })
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response
            expect(response.status).toBe(401)
            expect(body).toHaveProperty('message', ['Please login first'])
            
            done()
        })
    })

    it('test failed create product with wrong access_token(role is not admin), will return message', (done)=>  {
        request(app)
        .post('/products')
        .send({
            name: 'Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112',
            image_url: 'https://cf.shopee.co.id/file/eceb3abc88b0b819cf8d6fa57d107469',
            price: 395200,
            stock : 5
        })
        .set('Accept', 'application/json')
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtYmFAbWFpbC5jb20iLCJpYXQiOjE1OTc3NjM2NTV9.bzy5q4LLLx4e8sb38Zys9zwU9JKvxnmF2kXDogcBn6g')
        .then(response => {
            const { body } = response
            expect(response.status).toBe(403)
            expect(body).toHaveProperty('message', ['Not allowed. Only admin allowed'])
            
            done()
        })
    })

    it('test failed create product with wrong type data of price and stock, will return message', (done)=>  {
        request(app)
        .post('/products')
        .send({
            name: 'Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112',
            image_url: 'https://cf.shopee.co.id/file/eceb3abc88b0b819cf8d6fa57d107469',
            price: 'asdadssadads',
            stock : 'sadadsads'
        })
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const { body } = response
            
            expect(response.status).toBe(400)
            expect(body).toHaveProperty('message',expect.any(Array))
            done()
        })
    })
})

describe('PUT /products updated successfully', ()=>{
    it('test update product successfully will return message', (done)=>  {
        request(app)
        .put(`/products/${id}`)
        .send({
            name: 'Daster Arab Laura by Syeema',
            image_url: 'https://cf.shopee.co.id/file/a8db602e1d47f50f047cdf5ba87222aa',
            price: 11000,
            stock : 10
        })
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const { body } = response

            expect(response.status).toBe(200)
            expect(body).toHaveProperty('message', ['Successfully update'])
            done()
        })
    })
})

describe('PUT /products failed to update', ()=>{
    it('test failed update product without access_token', (done)=>  {
        request(app)
        .put(`/products/${id}`)
        .send({
            name: 'Daster Arab Laura by Syeema',
            image_url: 'https://cf.shopee.co.id/file/a8db602e1d47f50f047cdf5ba87222aa',
            price: 11000,
            stock : 10
        })
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response
            expect(response.status).toBe(401)
            expect(body).toHaveProperty('message', ['Please login first'])
            done()
        })
    })

    it('test failed update product with wrong access_token(role is not admin), will return message', (done)=>  {
        request(app)
        .put(`/products/${id}`)
        .send({
            name: 'Daster Arab Laura by Syeema',
            image_url: 'https://cf.shopee.co.id/file/a8db602e1d47f50f047cdf5ba87222aa',
            price: 11000,
            stock : 10
        })
        .set('Accept', 'application/json')
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtYmFAbWFpbC5jb20iLCJpYXQiOjE1OTc3NjM2NTV9.bzy5q4LLLx4e8sb38Zys9zwU9JKvxnmF2kXDogcBn6g')
        .then(response => {
            const { body } = response
            expect(response.status).toBe(403)
            expect(body).toHaveProperty('message', ['Not allowed. Only admin allowed'])
            done()
        })
    })

    it('test failed update product with wrong price such as minus', (done)=>  {
        request(app)
        .put(`/products/${id}`)
        .send({
            name: 'Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112',
            image_url: 'https://cf.shopee.co.id/file/eceb3abc88b0b819cf8d6fa57d107469',
            price: -10,
            stock : -10
        })
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const { body } = response
            
            expect(response.status).toBe(400)
            expect(body).toHaveProperty('message',expect.any(Array))
            done()
        })
    })
    
})


describe('GET /products successfully', () => {
    it('test update product successfully will return products', (done)=>  {
        request(app)
        .get(`/products`)
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const { body } = response

            expect(response.status).toBe(200)
            expect(body).toHaveProperty('products', expect.any(Object))
            done()
        })
    })
})

describe('GET /products failed', () => {
    it('test get products failed without access_token', (done)=>  {
        request(app)
        .get(`/products`)
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response
            expect(response.status).toBe(401)
            expect(body).toHaveProperty('message', ['Please login first'])
            done()
        })
    })

    it('test failed get product with wrong access_token(role is not admin), will return message', (done)=>  {
        request(app)
        .get(`/products`)
        .set('Accept', 'application/json')
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtYmFAbWFpbC5jb20iLCJpYXQiOjE1OTc3NjM2NTV9.bzy5q4LLLx4e8sb38Zys9zwU9JKvxnmF2kXDogcBn6g')
        .then(response => {
            const { body } = response
            expect(response.status).toBe(403)
            expect(body).toHaveProperty('message', ['Not allowed. Only admin allowed'])
            
            done()
        })
    })


})

describe('DELETE /products failed', () => {
    it('test delete products failed without access_token', (done)=>  {
        request(app)
        .delete(`/products/${id}`)
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response
            expect(response.status).toBe(401)
            expect(body).toHaveProperty('message', ['Please login first'])
            done()
        })
    })

    it('test failed delete product with wrong access_token(role is not admin), will return message', (done)=>  {
        request(app)
        .delete(`/products/${id}`)
        .set('Accept', 'application/json')
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtYmFAbWFpbC5jb20iLCJpYXQiOjE1OTc3NjM2NTV9.bzy5q4LLLx4e8sb38Zys9zwU9JKvxnmF2kXDogcBn6g')
        .then(response => {
            const { body } = response
            expect(response.status).toBe(403)
            expect(body).toHaveProperty('message', ['Not allowed. Only admin allowed'])
            
            done()
        })
    })

    
})

describe('DELETE /products deleted successfully', ()=>{
    it('test delete product successfully will return message', (done)=>  {
        request(app)
        .delete(`/products/${id}`)
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const { body } = response

            expect(response.status).toBe(200)
            expect(body).toHaveProperty('message', ['Successfully deleted'])
            done()
        })
    })
})