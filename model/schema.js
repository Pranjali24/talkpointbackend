const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/talkpoint', {useNewUrlParser: true, useUnifiedTopology: true});
let con=mongoose.connection

con.on('connected',()=>console.log('Connected to Database'))

const userSchema=new mongoose.Schema({
    socketid: String,
    fullname:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    chatmessages:[{messages:String , date:Date}],
    chatroom:String,
    active:{
      type:Boolean,
      default:true
    }

})

let User=new mongoose.model('User',userSchema)

module.exports=User

