const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")

async function updateUserDetails(req, res){
    try {
        const token = req.cookies.token || ""  
        const user  = await getUserDetailsFromToken(token)
        const {name,profile_pic} = req.body
        console.log(user,name,'cccccc');
        const updateUser = await UserModel.updateOne({_id:user._id},{
            name, profile_pic
        })
        const userInfo =await UserModel.findById(user._id)
        console.log(updateUser,userInfo,'userInfouserInfo')
        return res.json({
            message : "User updated succesdfully",
            data : userInfo,
            success :  true
        })
    
    } catch (error) {
        res.status(500).json({
            message : error.message || error,
            error : true
        })
        
    }
}
module.exports = updateUserDetails;