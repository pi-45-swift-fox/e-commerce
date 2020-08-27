if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config()
}
  const express = require('express')
  const app = express()
  const cors = require('cors')
  const routers = require('./routers')
  const errorHandler = require('./middlewares/errorHandler')
  
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(routers)
  app.use(errorHandler)
  
  module.exports = app