const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");

const User = require("../model/schema");
const userController = require('../controllers/user')

// registration for new user
router.post("/registration", userController.registrationUser );

// login user
router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({email:req.body.email,password:req.body.password},function(err,response){
    console.log('***************res*****',response);
  })
  
  User.findOneAndUpdate(
    { email: req.body.email, password: req.body.password },
    { active: true },
    function (err, validUser) {
      console.log('*******',validUser)
      
      if (err)  console.log(err);
      else if (!validUser) {
        console.log("not valid ", validUser);
        // Invalid User
        res.status(404).json({
          user: "Invalid UserName and Password",
        });
      } else {
        // create JWT Token for authentication
        let token = jwt.sign(
          { email: validUser.email, userId: validUser._id },
          "shhhhh",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          user: validUser,
        });
      }
    }
  );
});

// get active users
router.get("/", async (req, res) => {
  console.log("in get active method");
  let activeUser = await User.find({ active: true });
  let filterUser = activeUser.map((user) => {
    return user.fullname;
  });
  res.status(200).json(filterUser);
});

// get all messages of user
 router.get("/allmessages",async (req,res)=>{
   let token=req.headers['token']

   var decoded = jwt.verify(token, 'shhhhh');

   let getAllMessages=await User.findOne({email:decoded.email})

    res.status(200).json({
      username:getAllMessages.fullname,
      messages:getAllMessages.chatmessages
    })
 })



module.exports = router;
