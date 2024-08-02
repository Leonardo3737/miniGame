import printPlayers from "../utils/printPlayers.js"

export default class DisconnectHandler {
  constructor(
    socket,
    io,
    idPlayer,
    players
  ) {
    socket.on('disconnect', () => {
      io.emit('exit-player', idPlayer)
      delete players[idPlayer]
      printPlayers(players)
    })
  }
}