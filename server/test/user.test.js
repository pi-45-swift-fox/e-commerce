const request = require('supertest')
const app = require('../app')
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize
const { encrypt } = require('../helpers/bcrypt')

let user = {
    email: 'admin@mail.com',
    password: '1234'
}

beforeAll(done => {
    let firstUser = {
        email: user.email, 
        password: encrypt(user.password)
    }
    User.create(firstUser)
        .then(() => {
            done()
        })
})

afterAll(done => {
    queryInterface.bulkDelete('Users', {})
        .then(() => done())
})

describe('test login', () => {
    describe('Success login', () => {
        it('Return status code 200 with data and token', done => {
            request(app)
                .post('/login')
                .send(user)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('token', expect.any(String))
                    done()
                })
        })
    })

    describe('Wrong password', () => {
        it('Return status code 400 with message', done => {
            let loginUser = {
                email: user.email,
                password: 'password salah'
            }
            request(app)
                .post('/login')
                .send(loginUser)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'email or password is incorrect')
                    done()
                })
        })
    })

    describe('Email not found in database', () => {
        it('Return status code 400 with message', done => {
            let loginUser = {
                email: 'emailasal@mail.com',
                password: user.email
            }
            request(app)
                .post('/login')
                .send(loginUser)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'email or password is incorrect')
                    done()
                })
        })
    })

    describe('Email & password input empty', () => {
        it('Return status code 400 with message', done => {
            let loginUser = {
                email: '',
                password: ''
            }
            request(app)
                .post('/login')
                .send(loginUser)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'email or password is incorrect')
                    done()
                })
        })
    })
})