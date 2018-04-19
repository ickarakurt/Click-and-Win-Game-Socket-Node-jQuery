const socketio = require('socket.io');
const express = require('express');
const app = express();
const server = require('http').Server(app);

const io = socketio(server);
server.listen(3000);

app.set('view engine', 'pug');
app.use(express.static('public'));


app.get('/', function (req, res) {
    res.render('index.pug');
});


io.on('connection', function (socket) {

    socket.on('createroom', (data) => {
        let isExistRoom = io.sockets.adapter.rooms[data.roomname];
        if(isExistRoom){
            socket.emit('roomExist',{status : "Room already exist. Use different name."});
        }else{
            socket.join(data.roomname);
            let newdata = {range : data.range , speed : data.range};
            Object.assign(socket, newdata);
            io.to(data.roomname).emit('roomdata',{roomdata : io.sockets.adapter.rooms[data.roomname], userCount : io.sockets.adapter.rooms[data.roomname].length , range : data.range , speed : data.speed});
            console.log(socket);
        }

    });

    socket.on('joinRoom', (data)=>{
        let room = data.roomname;
        let isExistRoom = io.sockets.adapter.rooms[data.roomname];

        if(!isExistRoom){
            socket.emit('roomExist',{status : "Room can't find"});
        }else if(isExistRoom.length >= 2){
            socket.emit('roomExist',{status : "Room is full"});
        }else{
            socket.join(data.roomname);
            io.to(data.roomname).emit('roomdata',{roomdata : io.sockets.adapter.rooms[data.roomname], userCount : io.sockets.adapter.rooms[data.roomname].length, range : data.range , speed : data.speed});
            console.log(socket);
        }
    });



    socket.on('count',(data)=>{
        const room = Object.keys(socket.rooms)[0];
        socket.in(room).emit('count2',{count2 : data.count});
    });

    socket.on('lose', ()=> {
        let room = Object.keys(socket.rooms)[0];
        socket.in(room).emit('loser');
    });



    socket.on('disconnect',()=>{
        socket.broadcast.emit('leaved');
    });


});



