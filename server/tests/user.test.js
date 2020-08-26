const request = require('supertest')
const app = require('../app')

const validUser = {email: 'admin@mail.com', password: '1234'}
const invalidUserPassword = {email: 'admin@mail.com', password: '12345'}
const invalidUserEmail = {email: 'notadmin@mail.com', password: '1234'}

describe('POST /login success', () => {
    it('test login success', (done) => {
        request(app)
        .post('/login')
        .send(validUser)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response

            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })
})

describe('POST /login failed', () => {
    it('test login wrong password', (done) => {
        request(app)
        .post('/login')
        .send(invalidUserPassword)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response

            expect(status).toBe(404)
            expect(body).toHaveProperty('errorCode', 'NOT_FOUND')
            expect(body).toHaveProperty('message', 'invalid email or password')
            done()
        })
    })

    it('test login wrong email/email not found in DB', (done) => {
        request(app)
        .post('/login')
        .send(invalidUserEmail)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response

            expect(status).toBe(404)
            expect(body).toHaveProperty('errorCode', 'NOT_FOUND')
            expect(body).toHaveProperty('message', 'invalid email or password')
            done()
        })
    })

    it('test empty email and password', (done) => {
        request(app)
        .post('/login')
        .send({email: '', password: ''})
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response

            expect(status).toBe(404)
            expect(body).toHaveProperty('errorCode', 'NOT_FOUND')
            expect(body).toHaveProperty('message', 'invalid email or password')
            done()
        })
    })
})
