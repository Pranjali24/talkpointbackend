const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')
const uniqueUser = require('../middleware/uniqueUser')

const { checkAuth } = require('../auth/auth')

router
.get('/test',(req,res,next )=>{
    res.status(200).json({
        message:'api hit properly'
    })
})
    .get('/', checkAuth, userController.getAllUsers)
    // registred new admin or user
    .post('/', checkAuth, uniqueUser, userController.registrationUser)
    // Delete All Sub Admin and User
    .get('/deleteall', checkAuth, userController.deleteAllUsers)
    // Delete Single User
    .get('/:userid',checkAuth, userController.deleteOneUser)
    // update Single User
    .put('/', checkAuth, userController.updateUser)
    // Single User Details
    .get('/singleuser/:userid', checkAuth, userController.getSingleUser)

    
module.exports = router;