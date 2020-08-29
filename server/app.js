if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(route)
app.use(errorHandler)


if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log('app running')
    })
}

module.exports = app