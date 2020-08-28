const {user}=require('../models')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

class Controller{
    static async register(req,res,next) {
        try{
            const findData = await user.findOne({where: {
                email:req.body.email
            }})
            if(findData) {
                res.status(400).json({message: 'user already exist'})
            } else {
                user.create({
                    email: req.body.email,
                    password: req.body.password,
                })
                .then(createdData=>{
                    res.status(200).json({id:createdData.id,email:createdData.email})
                })
                .catch(err=>{
                    res.status(500).json(err)
                })
            }
        } catch(err) {
            res.status(500).json({message: err})
        }
    }
    static async login(req,res,next){

        try{
            console.log('ini emailll>>>>>>',req.body.email)
            const userData = await user.findOne({
                                            where:{
                                                email:req.body.email,
                                            }
                                        })
            if(!userData){
                console.log('not found')
                res.status(500).json('not found')
                // next({errorCode:'NOT_FOUND', message:`USER DOESN'T EXIST`})
            }
            else{
                //console.log(userData)
                    const verified=  bcrypt.compareSync(req.body.password,userData.password)
                    if(verified){

                    const token=jwt.sign({id:userData.id,email:userData.email,role:userData.role},'secret')
                    res.status(200).json({access_token:token})
                    console.log('verified>>>')
                    }
                    else{
                        res.status(401).json({massage:'Password is Incorrect'})
                    }

                }
        }catch(err){
            console.log(err)
            res.status(500).json({msg:'Error'})

        }
    }
}
module.exports=Controller