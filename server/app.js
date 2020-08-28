require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./Middlewares/ErrorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)
app.use(errorHandler)

// app.listen(PORT, ()=>{
//     console.log(`app listening to port ${PORT}`)
// })

module.exports = app