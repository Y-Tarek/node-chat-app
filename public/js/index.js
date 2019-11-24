var socket = io();
socket.on('connect',function()  {
    console.log("connected to server");
});


socket.on('disconnect',function(socket)  {
    console.log("server disconncted");
    
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li><li/>');
    var a = jQuery('<a target="_blank">My Location<a/>');
 
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
 
  });


socket.on('newMessage',function(message){
    console.log('new Message',message); 
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages").append(li);  
});

jQuery('#messageForm').on('submit',function(e){
    e.preventDefault();
    var messageTextBox = jQuery('[name = message]');
    if(messageTextBox.val().length === 0){
        return alert('write a message')
    }else{
        socket.emit('createMessage',{
            to:'User',
            from:'User',
            text: messageTextBox.val()
        },function(){
            messageTextBox.val('')
        });
    }
    
});

var locationButton = jQuery("#send-location");
 locationButton.on('click',function(){
     if(!navigator.geolocation){
         return alert('GeoLocation is not supported by your browser')
     }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

     navigator.geolocation.getCurrentPosition(function(position){
           socket.emit('createLocationMessage',{
               latitude:position.coords.latitude,
               longitude:position.coords.longitude
           });
           locationButton.removeAttr('disabled').text('Send location');
     },function(){
         return alert('Unable to fetch location');
     });
 });
   



