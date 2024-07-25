import express from "express"
import http from "http"
import { Server } from "socket.io"
import  GeneretePosition from "./utils/GeneratePosition.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const players = []

function genereteIdPlayer() {
  const id = parseInt(Math.random()*10000)
  if(id === 0 ) {
    return genereteIdPlayer()
  }
  return id
}

app.use(express.static('src/public'))
 
io.on('connection', (socket)=> {

  const idPlayer = genereteIdPlayer()
  const position = GeneretePosition()
  players.push({idPlayer, position})

  io.emit('new-player', { idPlayer, position, players })

  

  socket.on('disconnect', (reason)=> {
    io.emit('exit-player', idPlayer)
    const index = players.findIndex((e)=> e.idPlayer === idPlayer)
    players.splice(index, 1)
  })
})

server.listen(3000, ()=> { 
  console.log('rodando na porta 3000');
}) 