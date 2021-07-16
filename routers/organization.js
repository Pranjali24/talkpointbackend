const express =require('express')
const router = express.Router()

const uniqueOrganization = require('../middleware/uniqueOrganization')

const organizationControl = require('../controllers/organization')


router 
  // Registred New Organization 
  .post('/', uniqueOrganization, organizationControl.registredOrganization )


module.exports = router