const { Organization } = require('../config/schema')

// check email id already exist or not
module.exports = async(req,res,next) =>{

 let checkExistOrganizationEmail = await Organization.findOne({organizationEmail: req.body.organizationEmail})
 let checkExistOrganizationNumber = await Organization.findOne({organizationPhone: req.body.organizationPhone})

 if(checkExistOrganizationEmail) {
     res.status(401).json({
        status: 'failed',
        message: 'Email Id already registred !',
        status_code: '401'
     })
 } 
//  Number Already Exist 
 else if (checkExistOrganizationNumber) {
    res.status(401).json({
        status: 'failed',
        message: 'Mobile Number already registred !',
        status_code: '401'
     })
 }
 else {
    //  Organization Email id and Number is Unique
     next()
 }
 
}