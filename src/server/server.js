import express from "express"
import http from "http"
import { Server } from "socket.io"
import Player from "./entities/Player.js"
import DisconnectHandler from "./sockets/disconnectHandler.js"
import MovPlayerHandler from "./sockets/movPlayerHandler.js"
import cors from 'cors'
import RegisterPlayerController from './controllers/RegisterPlayerController.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const players = []
const player = new Player()

app.use(express.json())
app.use(cors())
app.use(express.static('src/public'))
 
new RegisterPlayerController(
  app, 
  io, 
  player, 
  players
) 

io.on('connection', (socket)=> {
  new MovPlayerHandler(socket, io, player.id, players)
  new DisconnectHandler(socket, io, player.id, players)  
})
 
server.listen(3000, ()=> { 
  console.log('rodando na porta 3000');
})   