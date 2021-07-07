var socket = io();

document.getElementById('sendbtn').addEventListener('click',()=>{
  let addMessages=document.getElementById('message').value
  console.log('clicked');
  socket.emit('message',addMessages)

})

