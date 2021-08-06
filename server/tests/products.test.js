require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const { sequelize } = require('../models')
const { queryInterface} = sequelize

const newProduct = {
    name: 'Kemeja garis',
    image_url: 'https://images.unsplash.com/photo-1565366896067-3e7b52d395e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
    price: 100000,
    stock: 10,
    category: 'fashion'
}
const user = {email: "admin@email.com", password: '1234'}
const userEmail = {email: 'admin@mail.com'}
const access_token = jwt.sign(userEmail, process.env.JWT_SECRET)

beforeAll(done => {
    request(app)
    .post('/login')
    .set('Accept', 'application/json')
    .send(user)
    .then(response => {
      const { status, body } = response;
      access_token = body.access_token;
  
      done();
    })
    .catch(err => console.log(err));
})

afterAll(() => {
    queryInterface.bulkDelete('Products', null, {})
    done()
})

// Create new product
describe('POST /products berhasil', function () {
    it('respon with json', function (done) {
        request(app)
        .post('/products')
        .send(newProduct)
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response

            expect(status).toBe(201)
            expect(body).toBe(`product with name ${newProduct.name} created`)
            done()
        })
    })
})

describe('POST /products gagal', function () {
    it('name tidak diisi', function (done) {
        request(app)
        .post('/products')
        .send({
            name: '',
            image_url: newProduct.email,
            price: newProduct.price,
            stock: newProduct.stock,
            category: newProduct.category
        })
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(403)
            expect(body).toHaveProperty("message","Validation error: Please Fill the name")
            done()
        })
    })

    it('image_url tidak diisi', function (done) {
        request(app)
        .post('/products')
        .send({
            name: newProduct.name,
            image_url: '',
            price: newProduct.price,
            stock: newProduct.stock,
            category: newProduct.category
        })
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(403)
            expect(body).toHaveProperty("message","Validation error: Please Fill the image url")
            done()
        })
    })

    it('price dibawah 1', function (done) {
        request(app)
        .post('/products')
        .send({
            name: newProduct.name,
            image_url: newProduct.image_url,
            price: 0,
            stock: newProduct.stock,
            category: newProduct.category
        })
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(403)
            expect(body).toHaveProperty("message","Validation error: Value must be greater than 0")
            done()
        })
    })

    it('stock dibawah 1', function (done) {
        request(app)
        .post('/products')
        .send({
            name: newProduct.name,
            image_url: newProduct.image_url,
            price: newProduct.price,
            stock: 0,
            category: newProduct.category
        })
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(403)
            expect(body).toHaveProperty("message","Validation error: Value must be greater than 0")
            done()
        })
    })

    it('category tidak diisi', function (done) {
        request(app)
        .post('/products')
        .send({
            name: newProduct.name,
            image_url: newProduct.image_url,
            price: newProduct.price,
            stock: newProduct.stock,
            category: ''
        })
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(403)
            expect(body).toHaveProperty("message","Validation error: Please Fill the category")
            done()
        })
    })
})


// Get All products
describe('GET /products berhasil', function () {
    it('respon with json', function (done) {
        request(app)
        .get('/products')
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(200)
            expect(body).toEqual(expect.any(Array))            
            done()
        })
    })
})

//Update product
describe('PUT /products berhasil', function () {
    it('respon with json', function (done) {
        request(app)
        .put('/products/'+ 14)
        .send({
            name: 'kemeja kerja',
            image_url: newProduct.image_url,
            price: newProduct.price,
            stock: newProduct.stock,
            category: newProduct.category
        })   
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(200)
            expect(body).toBe('berhasil update')            
            done()
        })
    })
})

describe('PUT /products gagal', function () {
    it('id salah', function (done) {
        request(app)
        .put('/products/'+ 1444444)
        .send({
            name: 'kemeja kerja',
            image_url: newProduct.image_url,
            price: newProduct.price,
            stock: newProduct.stock
        })   
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(404)
            expect(body).toBe('invalid request')            
            done()
        })
    })
})

//delete product
describe('DELETE /products berhasil', function () {
    it('response with json', function (done) {
        request(app)
        .delete('/products/'+ 14) 
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(200)
            expect(body).toBe('berhasil delete')            
            done()
        })
    })
})

describe('DELETE /products gagal', function () {
    it('salah id', function (done) {
        request(app)
        .delete('/products/'+ 122222) 
        .set({access_token, 'Accept': 'application/json'})
        .then(response => {
            const { status, body } = response
            console.log(body);
            expect(status).toBe(400)
            expect(body).toBe('invalid request')            
            done()
        })
    })
})
