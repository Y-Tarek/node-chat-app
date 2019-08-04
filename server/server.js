const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
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
    });

    server.listen(3000,(e) => {
    if(e){
        console.log(e);
    }
    else{
        console.log("Server Started");
        
    }
    })

