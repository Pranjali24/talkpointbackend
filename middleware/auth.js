const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
  try{
   const token=req.header.authorization
   jwt.verify(token,"shhhhh")
   next()
  }catch(err){
    res.status(401).json({
      message:'auth failed !'
    })
  }
}
