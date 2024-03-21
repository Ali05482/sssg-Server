const express = require("express");
const cors = require("cors");
const models = require('./src/models/')
const app = express();
const path = require("path");
const http = require("http").createServer(app); // Create an HTTP server
// const io = require("socket.io")(http, {
//   cors:{
//     cors:true
//     // origin: "192.168.18.19:3000  ",
//     // origin: "https://sss-g-client.vercel.app",
//     // credentials: false,
//   }
// }); // Create a Socket.io server
const dotenv = require("dotenv");
const helmet = require("helmet");
const connectDB = require("./config");
dotenv.config();
app.use(cors({ origin: "*" }));

// ... Your existing middleware and routes ...

const mainRoute = require("./src/api/v1/routes/");

const port = process.env.APP_PORT;
connectDB();

// Middleware to parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


// ********************************* //
//  SocketSetup
const users = {};
const socketToRoom = {};

// io.on('connection',  socket =>{
//   console.log("A user connected: ", socket.id);

//   socket.on('join-room', async roomID =>{
//     // const checkRoomId = await models.userMeetings.findOne({meeetingId:roomID});
//     // if(!checkRoomId){
//     //   socket.emit("room-not-found", socket.id);
//     //   return
//     // }
//     console.log("roomID====>", roomID)
//     if(users[roomID]){
//       const length = users[roomID].length;
//       if(length>=4){
//         socket.emit("room-full");
//         return ;
//       }
//       users[roomID].push(socket.id);
//     } else {
//       users[roomID] = [socket.id]
//     }
//     socketToRoom[socket.id] = roomID;
//     const usersInThisRoom = users[roomID].filter(id=>id!==socket.id);
//     console.log("socketToRoom===>", socketToRoom);
//     console.log("usersInThisRoom===>", usersInThisRoom);
//     console.log("users===>", users);
//     socket.emit("all-users", usersInThisRoom);
//   });

//   socket.on("sending-signal", payload=>{
//     io.to(payload.userToSignal).emit("user-joined", {signal:payload.signal, callerID:payload.callerID});
//   })

//   socket.on("returning-signal", payload=>{
//      io.to(payload.callerID).emit("receiving-returned-signal", {signal:payload.signal, id: socket.id})
//   });
//   socket.on('disconect-call', roomID=>{
//     const indexToRemove = users[roomID].indexOf(socket.id);
//     if (indexToRemove !== -1) {
//       users[roomID].splice(indexToRemove, 1);
//     }
//     socketToRoom[socket.id] = roomID;
//     const usersInThisRoom = users[roomID].filter(id=>id!==socket.id);
//     console.log("usersInThisRoom===>", usersInThisRoom);
//     console.log("users===>", users);
//     console.log("socket.id===>", socket.id);
//     socket.emit("user-disconnected", socket.id);
//     socket.emit("all-users", usersInThisRoom);
//   })
//   socket.on("disconnect", ()=>{
//     console.log("User Disconnected")
//     const roomID = socketToRoom[socket.id];
//     let room = users[roomID];
//     if(room){
//       room=room.filter(id=> id !==socket.id);
//       users[roomID] = room
//       console.log("usersFromDisconnection===>", users);
//        // Emit an event to inform clients about the disconnection
//        io.to(roomID).emit("user-disconnected", socket.id);
//     }
//   })
// });


app.use("/api/v1", mainRoute);
app.get('/', (req, res) => {
  res.status(404).json({ status: true, msg: "Fitwell Server is running :)", data: null });
});


http.listen(port, () => {
  console.log(`App is listening on PORT ${port}!`);
});
