
const { Organization } = require('../config/schema')

// Registred new organization
exports.registredOrganization = async (req, res, next) => {
//   let { organizationName, organizationEmail, organizationAddress, organizationPhone } = req.body
  console.log(req.body);
  let newOrganization = new Organization( req.body )

  let organizationReg = await newOrganization.save()
  
  res.status(200).json({
    status: 'success',
    message: 'Organization Registred Successfully !',
    status_code: '200',
    organizationDetails: organizationReg
    
   })

}