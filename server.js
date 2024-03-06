const express = require("express");
const app = express();

const server = require("http").createServer(app);
const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });


app.get("/", (req, res)=>{
    res.send("loljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
})

let roomIdGlobal,imgURLGlobal;
io.on("connection" , (socket) => {
    socket.on("userJoined",(data)=>{
        const {name , userId , roomId,host , presenter}= data;
        roomIdGlobal = roomId;
        socket.join(roomId);
        socket.emit("userIsJoined", {success : true});
        socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse",{
            imgURL : data.imgURL
        });
    });

    socket.on("whiteboardData",(data)=>{
        imgURLGlobal = data.imgURL;
        socket.broadcast.to(roomIdGlobal).emit("whiteboardDataResponse",{
            imgURL : data.imgURL
        });
        

    })


})


const port = process.env.PORT || 5000;
server.listen(port, ()=>console.log("server is running on https://localhost:5000"));