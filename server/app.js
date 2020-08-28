require('dotenv').config()
const express =require('express')
const port =3000
const cors=require('cors')
const app=express()
const route=require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(route)

app.listen(port,()=>{
    console.log('app is listening to http://localhost:',port)
})
module.exports = app

