const request = require('supertest')
const app = require('../app')
/*
  Testing login
  /login
  request body : email, password
  response status : 200
  respose json : {message : "success Login"}
 */


 describe('POST /login',()=>{
   test('200 Login Success - should return json message,',done=>{
      request(app)
        .post('/login')
        .send({
          email:'admin@mail.com',
          password:'12345'
        })
        .set('Accept',"application/json")
        .then((response)=>{
          const {body,status} = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('message','success login')
          expect(body).toHaveProperty('access_token',expect.any(String))
          done()
        })
        .catch((err)=>{
          done(err)
        })
   })
 })