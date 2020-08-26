require('dotenv').config()
const express= require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const err = require('./middlewares/errorHandler')
const routes = require('./routes')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',routes)

app.use(err)

app.listen(port,()=>{
  console.log(`listening in port ${port}`)
})


// module.exports =app