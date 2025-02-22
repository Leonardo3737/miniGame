import express from "express"
import http from "http"
import { Server } from "socket.io"
import Player from "./entities/Player.js"
import DisconnectHandler from "./sockets/disconnectHandler.js"
import MovPlayerHandler from "./sockets/movPlayerHandler.js"
import cors from 'cors'
import RegisterPlayerController from './controllers/RegisterPlayerController.js'
import DamagePlayerHandler from "./sockets/damagePlayerHandler.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const players = {}
let idPlayer = {}

app.use(express.json())
app.use(cors())
app.use(express.static('src/public')) 

// Routes
new RegisterPlayerController(app, io, idPlayer, players)

// Sockets
io.on('connection', (socket)=> {
  new MovPlayerHandler(socket, io, players)
  new DisconnectHandler(socket, io, idPlayer.id, players)
  new DamagePlayerHandler(socket, io, players)
})
 
server.listen(3000, ()=> {  
  console.clear()
  console.log('rodando na porta 3000');
})   