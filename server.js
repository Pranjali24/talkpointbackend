const express=require('express')
const path = require('path')
const user=require('./routers/user')
const User=require('./model/schema')
var jwt = require("jsonwebtoken");

const corsPermission =require('./crosPermission')

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
      origins: ['https://talk102.herokuapp.com/']
  }
});

const PORT=  process.env.PORT || 3000

app.use(corsPermission)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/",express.static(path.join(__dirname,"angular")))

app.use('/api/user',user)

function displayMessage(username,message,date=null){
  return {username,message,date}
}
io.on('connection', (socket) => {
  console.log('connected socket');
  
  socket.on('login',isLogin=>{
    console.log('islogin in server ',isLogin);
    if(isLogin) io.emit('chat',true)
    console.log('after emit into chat *****');
 })

 socket.on('joinRoom',userDetail=>{
   if(userDetail){ 
    // update socket id into database
   User.updateOne({_id:userDetail._id},{socketid:socket.id},function(err,response){
    // console.log(response);
    })
   //  show to current user
    socket.emit('message',displayMessage('Boot','Welcome To TalkPoint'))
   //  show message to all except current user
    socket.broadcast.emit('message',displayMessage(userDetail.fullname,'Has Join the Chat'))
  }

  })

  socket.on('disconnect',()=>{
    // Change Active to inactive user
    User.findOneAndUpdate({socketid:socket.id},{active:false},function(err,data){
       if(data){
         io.emit('message',displayMessage(data.fullname,'Left the chat room'))
       }
    })
  })
  // messages to show all users
 socket.on('getmessage', getDetails=>{
 console.log('**** date*****',getDetails)
   User.findOneAndUpdate({socketid:socket.id},{$push:{chatmessages:{messages:getDetails.sendMessages,date:getDetails.date}}},function(err,response){
     if(err) console.log(err)
     console.log('update message successfull !',response)

    //  if(response.chatmessages){
    //    console.log('have chatmessages');
    //   for(let singleMessage of response.chatmessages){
    //     io.emit('message',displayMessage(response.fullname,singleMessage.messages,singleMessage.date))
    //   }
    //  }else{
    //  io.emit('message',displayMessage(response.fullname,getDetails))
    // }

    })
  })


 });



app.get('/',function(req,res){
  let token = jwt.sign(
    { email: "pranjali@innovaeps.com", userId: "60e2af87ac5bb40d505f05fc" },
    "shhhhh",
    { expiresIn: "1h" }
  );
  res.status(200).json({
    token : token
  });
})


// generate Token
app.get('/api/token',function(req,res) {
  let token = jwt.sign(
    { email: "pranjali@innovaeps.com", userId: "60e2af87ac5bb40d505f05fc" },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({
    token : token
  });
})


//   Get detail from token
app.get('/api/:token', function(req,res){
  let token=req.params.token
  
  let decoded = jwt.verify(token, process.env.JWT_KEY);

  res.status(200).json({
      id : decoded.userId,
      email : decoded.email

  })
})  

app.use((req,res,next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
})

server.listen(PORT,()=>{
  console.log("Server run on Port :",PORT);
});
