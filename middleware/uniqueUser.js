const { User } = require('../config/schema')

// check email id already exist or not
module.exports = async(req,res,next) =>{
 let checkExistUserEmail = await User.findOne({email: req.body.email})
 let checkExistUserNumber = await User.findOne({mobileNumber: req.body.mobileNumber})
 if(checkExistUserEmail) {
     res.status(401).json({
        status: 'failed',
        message: 'Email Id already registred !',
        status_code: '401'
     })
 } 
//  Number Already Exist 
 else if (checkExistUserNumber) {
    res.status(401).json({
        status: 'failed',
        message: 'Mobile Number already registred !',
        status_code: '401'
     })
 }
 else {
    //  User Email id and Number is Unique
     next()
 }
}