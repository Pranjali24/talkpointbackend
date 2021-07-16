const express =require('express')
const router = express.Router()
const loginControl = require('../controllers/login')


router 
  //  login for superadmin, admin or user
   .post('/', loginControl.checkUser )

module.exports = router