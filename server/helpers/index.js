const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Bcrypt{

    static encrypt(password){
        const encryptedPassword = bcrypt.hashSync(password, 5)
        return encryptedPassword
    }

    static decrypt(password, hash){
        return bcrypt.compareSync(password, hash)
    }
}

class JWT{

    static generateToken(user){
        return jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.SECRET) 
        
    }

    static verifyToken(token){
        return jwt.verify(token, process.env.SECRET)
    }
}

module.exports = {Bcrypt, JWT}