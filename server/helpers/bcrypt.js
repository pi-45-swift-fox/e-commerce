const bcrypt = require('bcryptjs')

function hashing(password){
  return bcrypt.hashSync(password,8)  
}
function compare(password,hash){
  return bcrypt.compareSync(password,hash)
}

module.exports = {hashing,compare}