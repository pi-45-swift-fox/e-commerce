const request = require('supertest');
const app = require('../app'); 
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize
const {JWT} = require('../helpers')

const userLogin = {email: 'rawz@hot.id', password:'123456'}
const userData = {email: 'rawz23@hot.id', password:'123456'}
let access_token = ''

beforeAll(()=>{
    User.create(userLogin)
    .then(user=>{
      access_token = JWT.generateToken(user)
    })
    .catch(err=>{
    })
})

// afterAll(()=>{

//   queryInterface.bulkDelete("Users",{})
//   .then(() => done())
//   .catch(err=>{
//     done()
//   })
// })

describe("POST /register case berhasil", function(){
    test('test register berhasil dan akan mengembalikan email', function(done){
      request(app)
      .post('/register')
      .send(userData)
      .set('Accept', 'application/json')
      .then(response=>{
          
          const {status, body} = response
          expect(status).toBe(201)
          expect(body).toHaveProperty('email', userData.email)
          expect(body).toHaveProperty('message', 'Success Register')
          done()
      })
    })

    test('test register gagal', function(done){
      request(app)
      .post('/register')
      .send({email:"firaz@", password:"123"})
      .set('Accept', 'application/json')
      .then(response=>{
          const {status, body} = response
          expect(status).toBe(400)
          expect(body).toHaveProperty('message', expect.any(Array))
          done()
      })
    })
})

describe("POST /login case Berhasil", function(){
  test('test login berhasil dan mendapatkan token', function(done){
     request(app)
    .post('/login')
    .send(userLogin)
    .set('Accept', 'application/json')
    .then(response=>{
        const {status, body} = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('token', expect.any(String))
        done()
    })
  })

  test('test login gagal', function(done){
    request(app)
    .post('/login')
    .send({email:"firaz@hot.id", password:"1243123414"})
    .set('Accept', 'application/json')
    .then(response=>{
        const {status, body} = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', expect.any(Array))
        done()
    })
  })
})