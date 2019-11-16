var socket = io();
socket.on('connect',function()  {
    console.log("connected to server");
});


socket.on('disconnect',function(socket)  {
    console.log("server disconncted");
    
});


socket.on('newMessage',function(message){
    console.log('new Message',message); 
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages").append(li);  
});

jQuery('#messageForm').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        to:'User',
        from:'User',
        text: jQuery('[name = message]').val()
    },function(){

    })
    
});

