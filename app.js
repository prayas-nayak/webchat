const express=require("express");
const http=require("http");
const socket=require("socket.io");

const app=express();
const server=http.createServer(app);
const io=new socket.Server(server);

// const onlineList=[];

io.on("connection",(socket)=>{
    socket.on("messageFromClient",(clientMessage)=>{
        socket.broadcast.emit("messageFromServer",clientMessage)
    })
    // socket.on("onlineUsers",(onlineUsersList)=>{
    //     socket.broadcast(onlineList)
    // })
    socket.on("userJoined",(sendNameOfNewUserToAll)=>{
        socket.broadcast.emit("fromServerThatNewUserJoined",sendNameOfNewUserToAll);
        console.log(sendNameOfNewUserToAll);
    })
})


app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})
const PORT=process.env.PORT || 3000 ;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));