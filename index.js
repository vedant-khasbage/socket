const express=require("express");
const http=require("http");
const app=express();
const path=require("path");
const {Server}=require("socket.io")

const server=http.createServer(app);
const io=new Server(server); 

app.use(express.static(path.resolve("./public")))

app.get("/",(req,res)=>{
    return res.sendFile("./public/index.html")
})

//io connection if connection built it call that socket callback function
io.on("connection",(socket)=>{
    socket.on("user-msg",(meassage)=>{
        io.emit("resend-msg",meassage);
    })
    console.log("new connection has built",socket.id);
})

server.listen(9000,()=>console.log("Sever Started!!"));