import express from "express"
import http from "http"

const app = express()
const server = http.createServer(app)

app.use(express.static('src'))

server.listen(3000, ()=> {
  console.log('rodando na porta 3000');
})