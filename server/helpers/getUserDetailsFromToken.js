const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const getUserDetailsFromToken = async(token)=>{
    if(!token){
        return { 
            message  : "session timeout",
            logout : true
        }
    }
    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
    const user = await UserModel.find({_id:decode.id})
    return user[0];

}

module.exports =  getUserDetailsFromToken;