const jwt=require('jsonwebtoken')

// Check JWT token have or not
exports.checkAuth = (req,res,next) => {
  try{
   let token = req.headers['authorization']

   // not getting token from user 
   if(!token) {
    res.status(401).json({
      status: 'failed',
      message: 'user not login !',
      status_code: '401'
    })
   return 
  }
   next()
  }catch(err){
    console.log('Error in auth checkAuth module : ',err);
  }
}

// Get JWT token details
exports.getTokenDetail = async (req, res, next) =>{
 try {
    let token = req.headers['authorization']
    console.log('token in getoken *******',token);
    if(token) {
        let token = req.headers['authorization'].split(' ')[1]
        let decode = await jwt.verify( token, process.env.JWT_TOKEN_KEY )
        return decode
    }

 } catch (error) {
    console.log('Error in auth getTokenDetail module : ',error); 
 }
}