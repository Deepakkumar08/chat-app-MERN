const UserModel =  require('../models/UserModel')
const bcryptjs = require('bcryptjs')
const jwt  = require('jsonwebtoken')
async function checkPassword (req, res){
    try {
        const {  password , userId } = req.body
console.log(userId,'useriiiidddd')
        const user = await UserModel.findById(userId)
        console.log(user,req.body,'userrrr')
        const verifyPass= await bcryptjs.compare(password, user.password)
        if(!verifyPass){
            return res.status(400).json({
                message :  "In correct password",
                error :true
            })
        }
        const tokenData = {
            id : user._id,
            email : user.email
        }
        const token= await jwt.sign(tokenData , process.env.JWT_SECRET_KEY, {expiresIn :'1d'})
        const cookieOption = {
            http :  true,
            secure :  true
        }
        
            return res.cookie('token', token, cookieOption).status(201).json({
                message :  "Logged In  successfully",
                token : token ,
                success :  true
            })
    
      
        
    } catch (error) {
        return res.status(500).json({
            message :  error.message || error,
            error :  true
        })
        
    }
}

module.exports =  checkPassword;