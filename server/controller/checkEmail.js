const UserModel =  require('../models/UserModel')
async function checkEmail (req, res){
    try {
        const {  email } = req.body
        const checkEmail = await UserModel.findOne({email}).select('-password')
        console.log(checkEmail,'checllll')
        if(!checkEmail){
            return res.status(400).json({
                message :  "user not exits",
                error :true
            })
        }
        else{
            return res.status(201).json({
                message :  "email verified successfully",
                data : checkEmail,
                success :  true
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message :  error.message || error,
            error :  true
        })
        
    }
}

module.exports =  checkEmail;