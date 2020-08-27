const request = require('supertest')
const app = require('../app.js')

describe('POST /login successfully', ()=>{
    it('test login will return access_token', (done)=>  {
        request(app)
        .post('/login')
        .send({email:'admin@mail.com', password:'1234'})
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response
            expect(body).toHaveProperty('access_token', expect.any(String))
            expect(response.status).toBe(200)
            done()
        })
    })
})

describe('POST /login failed', ()=>{
    it('test login will return error,wrong password', (done)=>  {
        request(app)
        .post('/login')
        .send({email:'admin@mail.com', password:'12345'})
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response

            expect(body).toHaveProperty('message', ['Invalid password or email'])
            expect(response.status).toBe(401)
            done()
        })
    })

    it('test login will return error,wrong email', (done)=>  {
        request(app)
        .post('/login')
        .send({ email:'admin8@mail.com', password:'1234' })
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response

            expect(body).toHaveProperty('message', ['Invalid password or email'])
            expect(response.status).toBe(401)
            done()
        })
    })

    it('test login will return error,empty email and password', (done)=>  {
        request(app)
        .post('/login')
        .send({ email:'', password:'' })
        .set('Accept', 'application/json')
        .then(response => {
            const { body } = response
            expect(body).toHaveProperty('message', ['Invalid password or email'])
            expect(response.status).toBe(401)
            done()
        })
    })


})

