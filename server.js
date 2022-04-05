const { instrument } = require('@socket.io/admin-ui');


const io = require("socket.io")(8000, {
    cors: {
        origin: "*",
    }
});
io.on("connection", socket => {
    console.log(socket.id);

    socket.on("new-user-joined", name => {
        // console.log(name + " joined");
        socket.broadcast.emit("user-joined", name);
    });
    socket.on("message-send", (message, name, room) => {
        console.log(room + "room");
        // io.emit("message-recieved",message,name);
        if (room === '') {
            socket.broadcast.emit("message-recieved", message, name);
        } else {
            socket.to(room).emit("message-recieved", message, name);
        }
    });
    socket.on("join-room", (room ,name, cb) => {
        socket.join(room);
        socket.to(room).emit("user-joined", name);
        cb(`Joined room "${room}"`);
    });

    // socket.on('disconnect', message => {
    //     socket.broadcast.emit('user-left', socket.id);
    //     delete users[Socket.id];

    // })

})


instrument(io,{auth : false});




