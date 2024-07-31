const UserModel =  require('../models/UserModel')
const brcyptjs = require('bcryptjs')
async function registeredUser (req, res){
    try {
        const { name, email , profile_pic, password } = req.body
        console.log(req.body,'nbodyyyyy')
        const checkEmail = await UserModel.find({email})
        if(checkEmail && checkEmail.length>0){
            return res.json(400).json({
                message :  "Already user exits",
                error :true
            })
        }
        else{
            const salt = await brcyptjs.genSalt(10)
            const hasspassword = await brcyptjs.hash(password,salt)
    
            const payload = {
                name,
                email,
                password : hasspassword,
                profile_pic
            }
            const user  = new UserModel(payload)
            const userSave = await user.save()
    
            return res.status(201).json({
                message :  "User Created successfully",
                data : userSave,
                success :  true
            })
        }
      
        
    } catch (error) {
        console.log('9876556789',error.message)
        return res.status(500).json({
            message :  error.message || error,
            error :  true
        })
        
    }
}

module.exports =  registeredUser;