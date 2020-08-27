const request = require('supertest')
const app = require('../app.js');
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const jwt = require('jsonwebtoken');

let dataId=''
let dataId1=''
let token=''
let userToken= ''

beforeAll(async (done) =>{
  console.log('masukas')
    try{
      const {user} = require('../models')
      const admin = await user.findOne({
        where:{email: 'admin@mail.com'}
      })
      console.log('admin>>>>>',admin)
      token = jwt.sign({id:admin.id,email: admin.email,role: admin.role},'secret')
      console.log('token >>>>>',token);
      const userData = await user.findOne({
        where:{email:'user@mail.com'}
      })
      userToken = jwt.sign({id:userData.id,email:userData.email,role:userData.role},'secret')
      console.log('token >>>>>',token);

      done()
    }catch(err){
      console.log('error beforeAll',err)
      done()
    }
})

// afterAll(() => {
//     //hapus data di table
//     //sequelize query interface
//     queryInterface.bulkDelete('products', {})
//     .then(() => done())
//     .catch(err => done())

// })

// POST /products
describe('POST /products untuk test case berhasil', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/products')
        .send({name: 'YAMAHA 612 VII',price: 600,image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:3})
        .set('Accept', 'application/json')
        .set('access_token',token)
        
        .then(response=>{
            const {status,body} = response
            dataId1=body.id
            expect(status).toBe(200)
            expect(body.name).toContain('YAMAHA 612 VII')
            done()
        }) 
        
    });
  });

  describe('POST /products untuk test case gagal', function() {
    it('price is below 0', function(done) {
      request(app)
        .post('/products')
        .send({name: 'YAMAHA 612 VII',price: -600,image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:3})
        .set('Accept', 'application/json')
        .set('access_token',token)
        .then(response=>{
            const {status,body} = response
            expect(status).toBe(400)

            expect(body.message).toContain('should be more than 0')
            done()

        }) 
        
    }),
    it('stock is below 0', function(done) {
        request(app)
          .post('/products')
          .send({name: 'YAMAHA 612 VII',price: 600,image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:-3})
          .set('Accept', 'application/json')
          .set('access_token',token)
          .then(response=>{
              //console.log('error dari test >>>>',response.body)
              const {status,body} = response
              //console.log('casegagal>>>>>',body)
              expect(status).toBe(400)
  
              expect(body.message).toContain('should be more than 0')
              done()
  
          }) 
          
      }),
      it('name is Empty', function(done) {
        request(app)
          .post('/products')
          .send({name: '',price: 600,image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:-3})
          .set('Accept', 'application/json')
          .set('access_token',token)
          .then(response=>{
              //console.log('error dari test >>>>',response.body)
              const {status,body} = response
              //console.log('casegagal>>>>>',body)
              expect(status).toBe(400)
              //console.log(body.message)
  
              expect(body.message).toContain('IS EMPTY')
              done()
  
          }) 
          
      }),
      it('image_url is Empty', function(done) {
        request(app)
          .post('/products')
          .send({name: 'YAMAHA 612 VII',price: 600,image_url:'',stock:3})
          .set('Accept', 'application/json')
          .set('access_token',token)
          .then(response=>{
              //console.log('error dari test >>>>',response.body)
              const {status,body} = response
              //console.log('casegagal>>>>>',body)
              expect(status).toBe(400)
              //console.log(body.message)
  
              expect(body.message).toContain('IS EMPTY')
              done()
  
          }) 
          
      }),
      it('integer field filled with string', function(done) {
        request(app)
          .post('/products')
          .send({name: 'YAMAHA 612 VII',price: 'hehe',image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:3})
          .set('Accept', 'application/json')
          .set('access_token',token)
          .then(response=>{
              //console.log('error dari test >>>>',response.body)
              const {status,body} = response
              //console.log('casegagal>>>>>',body)
              expect(status).toBe(400)
             
  
              expect(body.message).toContain('invalid input syntax for type integer')
              done()
  
          }) 
          
      }),
      it('no access_token', function(done) {
        request(app)
          .post('/products')
          .send({name: 'YAMAHA 612 VII',price: 'hehe',image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:3})
          .set('Accept', 'application/json')
          .set('access_token','')
          .then(response=>{
              //console.log('error dari test >>>>',response.body)
              const {status,body} = response
              //console.log('casegagal>>>>>',body)
              expect(status).toBe(400)
             
  
              expect(body.message).toContain('token not found')
              done()
  
          }) 
          
      }),
      it('access_token belongs to user', function(done) {
        request(app)
          .post('/products')
          .send({name: 'YAMAHA 612 VII',price: 'hehe',image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:3})
          .set('Accept', 'application/json')
          .set('access_token',userToken)
          .then(response=>{
              //console.log('error dari test >>>>',response.body)
              const {status,body} = response
              //console.log('casegagal>>>>>',body)
              expect(status).toBe(400)
             
  
              expect(body.message).toContain('not authorized')
              done()
  
          }) 
          
      })

    ;
  });
//GET /products
describe('GET /products untuk test case berhasil', function() {

    it('responds with json', function(done) {
      request(app)
        .get('/products')
        .set('Accept', 'application/json')
        .set('access_token',token)
        .then(response=>{
            //console.log('ini token>>>>>',token)

            const {status,body} = response
            
            //console.log('response message>>>>',response.error)

            expect(status).toBe(200)
            //console.log(body).
            expect(body[0]).toHaveProperty('name')
            done()
        }) 
        
    });
  });
describe('GET /products failed case', function() {
  it('access_token is not available', function(done) {
    return request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('access_token','')
      .then(response=>{
        const {status,body}=response
        expect(status).toBe(400);
        expect(body.message).toContain('token not found')

        done()
      })
      
      
  }),
  it('access_token is available but belongs to user', function(done) {
    return request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .set('access_token',userToken)
      .then(response=>{
        const {status,body}=response
        expect(status).toBe(400);
        expect(body.message).toContain('not authorized')
        done()
      }) 
  })
  ;
});

// comment PUT /products section if you want to test delete
//delete products 
// describe('DELETE /products success case', function() {
//     //console.log('dataId>>>>>',dataId)
//     it('responds with json', function(done) {
//       request(app)
//         .delete(`/products/${dataId1}`)
//         .set('Accept', 'application/json')
//         .set('access_token', token)
//         .then(response=>{
//             const {status,body}=response
//             expect(status).toBe(200)
            
//             done()
            
//         })
//     });
//   });

  describe('DELETE /products failed case', function() {
    it('access_token is not available', function(done) {
      return request(app)
        .delete(`/products/${dataId1}`)
        .set('Accept', 'application/json')
        .set('access_token','')
        .then(response=>{
          const {status,body}=response
          expect(status).toBe(400);
          expect(body.message).toContain('token not found')
  
          done()
        })
        
        
    }),
    it('access_token is available but belongs to user', function(done) {
      return request(app)
        .delete(`/products/${dataId1}`)
        .set('Accept', 'application/json')
        .set('access_token',userToken)
        .then(response=>{
          const {status,body}=response
          expect(status).toBe(400);
          expect(body.message).toContain('not authorized')
          done()
        }) 
    })
    ;
  });
  
// update products
describe('PUT /products/:id', function() {
  it('responds with json', function(done) {
    return request(app)
      .put(`/products/${dataId1}`)
      .set('Accept', 'application/json')
      .set('access_token',token)
      .send({name: 'YAMAHA 612 VII',price: 545,image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:3})
      .then(response => {
          const {status,body} = response
          expect(status).toBe(200)

          done()
      })
  });
});

describe('PUT /products/:id failed case', function() {
  it('no access_token', function(done) {
    return request(app)
      .put(`/products/${dataId1}`)
      .set('Accept', 'application/json')
      .set('access_token','')
      .send({name: 'YAMAHA 612 VII',price: 545,image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:3})
      .then(response => {
        const {status,body} = response
        expect(status).toBe(400);
        expect(body.message).toContain('token not found')

        done()
      })
  });
});

describe('PUT /products/:id failed case', function() {
  it('no access_token', function(done) {
    return request(app)
      .put(`/products/${dataId1}`)
      .set('Accept', 'application/json')
      .set('access_token',userToken)
      .send({name: 'YAMAHA 612 VII',price: 545,image_url:'https://cf.shopee.co.id/file/da7846df4a2d76fb378f8cbaf425ab10',stock:3})
      .then(response => {
        const {status,body} = response
        expect(status).toBe(400);
        expect(body.message).toContain('not authorized')
        
        done()
      })
  });
});
