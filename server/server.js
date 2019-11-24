const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const app = express();

// configuring middleware
    const publicpath = path.join(__dirname ,'../public');
    app.use(express.static(publicpath));

// setting the server with web sockets
    var server = http.createServer(app);
    var io = socketIo(server);

    io.on("connection",(socket) => {
        console.log("user is connected");

        
            socket.on('disconnect',() => {
                console.log("user is off");
            });

            socket.emit('newMessage',generateMessage('Admin','Welcome To chat app'));

            socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

              
            socket.on('createMessage',(message,callback) => {
                console.log('Message: ',message);
                io.emit('newMessage', generateMessage(message.from, message.text));
                callback();
            })
           
           socket.on('createLocationMessage',(coords)=>{               
                io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
           })
    });

    server.listen(3000,(e) => {
    if(e){
        console.log(e);
    }
    else{
        console.log("Server Started");
        
    }
    })

