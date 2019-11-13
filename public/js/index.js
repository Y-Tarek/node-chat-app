var socket = io();
socket.on('connect',function()  {
    console.log("connected to server");
    
  socket.emit('createMessage',{
      to:'walter',
      from:'peter',
      text:'walter is great'
  });
});

socket.on('disconnect',function(socket)  {
    console.log("server disconncted");
    
});


socket.on('newMessage',function(message){
    console.log('new Message',message);   
})

