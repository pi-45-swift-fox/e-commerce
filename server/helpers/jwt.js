let jwt = require('jsonwebtoken')

function encode(data){
  return jwt.sign(data,process.env.SECRET)
}

function decode(token){
  return jwt.verify(token,process.env.SECRET)
}

module.exports ={encode,decode}