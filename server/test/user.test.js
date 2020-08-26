const request = require('supertest');
const app = require('../app');

const userData = { email: 'klaustin.wijaya@gmail.com', password: '123456' };
module.exports = userData;

describe('POST /login - success run', function () {
    it('returns token', function (done) {
        request(app)
            .post('/login')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(200);
                expect(body).toHaveProperty('token');
                done();
            })
    });
});

describe('POST /login - fail run', function () {
    it('returns invalid input data, reason: wrong email', function (done) {
        request(app)
            .post('/login')
            .send({ email: 'notanemail@mail.com', password: userData.password })
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(401);
                done();
            })
    });
});

describe('POST /login - fail run', function () {
    it('returns invalid input data, reason: wrong password', function (done) {
        request(app)
            .post('/login')
            .send({ email: userData.email, password: 'notapassword' })
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(401);
                done();
            })
    });
});

describe('POST /login - fail run', function () {
    it('returns invalid input data, reason: no value given', function (done) {
        request(app)
            .post('/login')
            .send({ email: '', password: '' })
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(401);
                done();
            })
    });
});

describe('POST /login - fail run', function () {
    it('returns invalid input data, reason: empty object', function (done) {
        request(app)
            .post('/login')
            .send()
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;

                expect(status).toBe(401);
                done();
            })
    });
});