const request = require('supertest')
const app = require('../app')
const { User, sequelize, Product } = require('../models')
const { encode } = require('../helpers/jwt')
const { queryInterface } = sequelize

const userData = {
  email: 'admin@mail.com',
  role: 'admin'
}
let userToken = ''
let idDelete,idEdit = null
// /*
//   Testing product
//   /product
// */
beforeAll(async done => {
  try {
    const user = await User.findOne({ where: { email: userData.email } })
    userToken = encode({ email: user.email, role: user.role })
    const product1 = await Product.create({
      name: 'buku',
      image_url: 'https://asset.kompas.com/crops/mTnVdoYXCoN9ElxrsEDbdoY7y0s=/65x65:865x599/750x500/data/photo/2017/06/28/1265845835.jpg',
      price: '10000',
      stock: '10'
    })
    idDelete = product1.id
    const product2 = await Product.create({
      name: 'buku',
      image_url: 'https://asset.kompas.com/crops/mTnVdoYXCoN9ElxrsEDbdoY7y0s=/65x65:865x599/750x500/data/photo/2017/06/28/1265845835.jpg',
      price: '10000',
      stock: '10'
    })
    idEdit = product2.id
    done()
  } catch (error) {
    done(error)
  }
})

afterAll(done => {
  queryInterface.bulkDelete('Products',{})
  .then(()=>{
    done()
  })
  .catch((err)=>{
    done(err)
  })
})




// CREATE
// describe('POST /products', async (done)=>{
it('POST /products', async (done) => {
  try {
    const response = await request(app)
      .post('/products')
      .set('access_token', userToken)
      .send({
        name: 'buku',
        image_url: 'https://asset.kompas.com/crops/mTnVdoYXCoN9ElxrsEDbdoY7y0s=/65x65:865x599/750x500/data/photo/2017/06/28/1265845835.jpg',
        price: '10000',
        stock: '10'
      })
    const { body, status, iditem } = response
    id = iditem
    expect(status).toBe(201)
    expect(body).toHaveProperty('message', 'success add data')
    console.log(body.message)
    done()
  } catch (error) {
    done(error)
  }
})
// UPDATE
it('PUT /products/:id', async (done) => {
  try {
    const response = await request(app)
      .put(`/products/${idEdit}`)
      .set('access_token', userToken)
      .send({
        name: 'Update buku',
        image_url: 'https://asset.kompas.com/crops/mTnVdoYXCoN9ElxrsEDbdoY7y0s=/65x65:865x599/750x500/data/photo/2017/06/28/1265845835.jpg',
        price: '10000',
        stock: '5'
      })
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'success update data')
    done()
  } catch (error) {
    done(error)
  }
})
//DELETE
it('DELETE /products/:id', async (done) => {
  try {
    const response = await request(app)
      .delete(`/products/${idDelete}`)
      .set('access_token',userToken)      
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'success delete data')
    done()
  } catch (error) {
    done(error)
  }
})

//READ 
it('GET /products', async (done)=>{
  try {
    const response = await request(app)
    .get('/products')
    .set('access_token',userToken)
    .set('Accept',"application/json")
    const {body , status} = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message','success fetch data')
    done()
  } catch (error) {
    done(error)
  }
})