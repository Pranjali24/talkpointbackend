const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const { User } = require('../config/schema')

// check login user is super admin, admin  or user
exports.checkUser = async (req, res, next) => {

  let {email, password} = req.body
  let checkUser = await User.findOne({email})
  
  // Check Email Id 
    if(checkUser) {
      let validUser = await bcrypt.compare(password, checkUser.password);
      // Check  Password
      if(validUser) {
        let token = jwt.sign({ id: checkUser._id, email: checkUser.email }, process.env.JWT_TOKEN_KEY);
        console.log('token in login : ',token);
        
      // User email id Valid
        res.status(200).json({
         status: 'success',
         message: 'user is valid',
         status_code: '200',
         data: checkUser,
         token: token
         })
      }
      else{
        // User Password is incorrect
        res.status(401).json({
         status: 'failed',
         message: 'Password is incorrect',
         status_code: '401'
        })
      }
    }
    else {
      // User email id is incorrect

       res.status(401).json({
        status: 'failed',
        message: 'user is invalid',
        status_code: '401'
       })

    }

}