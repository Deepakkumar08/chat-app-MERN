const express =  require('express')
const registeredUser =require('../controller/registeredUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')

const router = express.Router()

router.post('/register',registeredUser)
router.post('/email',checkEmail)
router.post('/password',checkPassword)
router.get('/user-Details',userDetails)
router.get('/logout',logout)
router.post('/update-User',updateUserDetails)

module.exports = router