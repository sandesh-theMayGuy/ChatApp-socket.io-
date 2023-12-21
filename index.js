import express from "express";
import http from "http";
import {Server} from  "socket.io";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import "dotenv/config";
import sequelize from "./models/index.js";
import message from "./models/chatModel.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);


const io = new Server(server, {
    connectionStateRecovery: {}
  });

io.on('connection', (socket) => {
   

    let user;  
    socket.on('chat message', async (msg) => {
        io.emit('chat message', `${user} : ${msg}`);

   const newMessage = await message.create({ userName: `${user}` ,message : `${msg}`});

      });
    
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('user',(newUser)=>{
        user = newUser;
        console.log(user);
        socket.broadcast.emit('user-connected',user);

    })
  });
  

app.get("/",(req,res)=>{
  

    res.sendFile(__dirname+"/pages/index.html");
});

app.get("/retrieve-chats",async (req,res)=>{
    const messages = await message.findAll()
   
    res.json(messages);

});


server.listen(PORT,async ()=>{
    console.log(`Listening at port ${PORT}`);



      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');


      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      
});

