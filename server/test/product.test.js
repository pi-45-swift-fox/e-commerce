const request = require('supertest');
const app = require('../app');
const profile = require('./user.test');
const { sequelize } = require('../models');
const queryInterface = sequelize;

let admin_token,
    user_token,
    product_id,
    product = {
        name: 'Test Product',
        image_url: 'www.testurl.com',
        price: 100,
        stock: 20
    };

beforeAll(() => {
    request(app)
        .post('/login')
        .send(profile)
        .set('Accept', 'application/json')
        .then(response => {
            const { status, body } = response;

            expect(status).toBe(200);
            return admin_token = body.token;
        })

    request(app)
        .post('/login')
        .send({ email: 'bukanadmin@mail.com', password: profile.password })
        .set('Accept', 'application/json')
        .then(response => {
            const { status, body } = response;

            expect(status).toBe(200);
            return user_token = body.token;
        })
});

afterAll(async () => {
    try {
        await queryInterface.bulkDelete('Products', {}, {});
    } catch (error) {
        return error;
    }
});

describe('POST /products - success run', function () {
    it('returns created product', function (done) {
        request(app)
            .post('/products')
            .send(product)
            .set('Accept', 'application/json')
            .set('access_token', admin_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(201);
                expect(body.result).toHaveProperty('name');
                product_id = body.result.id;
                done();
            })
    });
});

describe('POST /products - fail run', function () {
    it('returns invalid token', function (done) {
        request(app)
            .post('/products')
            .send(product)
            .set('Accept', 'application/json')
            .set('access_token', user_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(403);
                done();
            })
    });
});

describe('POST /products - fail run', function () {
    it('returns invalid input data, reason: empty fields', function (done) {
        request(app)
            .post('/products')
            .send({
                name: '',
                image_url: '',
                price: '',
                stock: ''
            })
            .set('Accept', 'application/json')
            .set('access_token', admin_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(400);
                done();
            })
    });
});

describe('POST /products - fail run', function () {
    it('returns invalid input data, reason: negative value in required fields', function (done) {
        request(app)
            .post('/products')
            .send({
                name: product.name,
                image_url: product.image_url,
                price: -10000,
                stock: -10
            })
            .set('Accept', 'application/json')
            .set('access_token', admin_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(400);
                done();
            })
    });
});

describe('GET /products - success run', function () {
    it('returns products using admin token', function (done) {
        request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .set('access_token', admin_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(200);
                expect(body);
                done();
            })
    });
});

describe('GET /products - success run', function () {
    it('returns products using user token', function (done) {
        request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .set('access_token', user_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(200);
                expect(body);
                done();
            })
    });
});

describe('GET /products - success run', function () {
    it('returns products without token', function (done) {
        request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(200);
                done();
            })
    });
});

describe('PUT /products - success run', function () {
    it('returns created product', function (done) {
        request(app)
            .put(`/products/${product_id}`)
            .send(product)
            .set('Accept', 'application/json')
            .set('access_token', admin_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(201);
                done();
            })
    });
});

describe('PUT /products - fail run', function () {
    it('returns invalid token', function (done) {
        request(app)
            .put(`/products/${product_id}`)
            .send(product)
            .set('Accept', 'application/json')
            .set('access_token', user_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(403);
                done();
            })
    });
});

describe('PUT /products - fail run', function () {
    it('returns invalid input data, reason: empty fields', function (done) {
        request(app)
            .put(`/products/${product_id}`)
            .send({
                name: '',
                image_url: '',
                price: '',
                stock: ''
            })
            .set('Accept', 'application/json')
            .set('access_token', admin_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(400);
                done();
            })
    });
});

describe('PUT /products - fail run', function () {
    it('returns invalid input data, reason: negative value in required fields', function (done) {
        request(app)
            .put(`/products/${product_id}`)
            .send({
                name: product.name,
                image_url: product.image_url,
                price: -10000,
                stock: -10
            })
            .set('Accept', 'application/json')
            .set('access_token', admin_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(400);
                done();
            })
    });
});

describe('DELETE /products - fail run', function () {
    it('returns invalid token', function (done) {
        request(app)
            .delete(`/products/${product_id}`)
            .set('Accept', 'application/json')
            .set('access_token', user_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(403);
                done();
            })
    });
});

describe('DELETE /products - success run', function () {
    it('returns products using user token', function (done) {
        request(app)
            .delete(`/products/${product_id}`)
            .set('Accept', 'application/json')
            .set('access_token', admin_token)
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(200);
                done();
            })
    });
});