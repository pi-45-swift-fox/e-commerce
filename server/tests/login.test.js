require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const userData = {email: 'admin@mail.com', password: '1234'}

describe('POST /login berhasil', function() {
  it('responds with json', function(done) {
    request(app)
      .post('/login')
      .send(userData)
      .set('Accept', 'application/json')
      .then(response => {
        const { status, body } = response
        const token = jwt.sign({email: 'admin@mail.com'}, process.env.JWT_SECRET)
        
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', token)
        done()    
      })
  });
});

describe('POST /login gagal', function() {
  it('salah email', function(done) {
    request(app)
      .post('/login')
      .send({email: 'adin@mail.com', password: '1234'})
      .set('Accept', 'application/json')
      .then(response => {
        const { status, body } = response
        
        expect(status).toBe(404)
        expect(body).toBe('Email atau password salah')
        done();    
      })
  });

  it('salah password', function(done) {
    request(app)
      .post('/login')
      .send({email: 'admin@mail.com', password: '123456'})
      .set('Accept', 'application/json')
      .then(response => {
        const { status, body } = response
        
        expect(status).toBe(404)
        expect(body).toBe('Email atau password salah')
        done();    
      })
  });
});