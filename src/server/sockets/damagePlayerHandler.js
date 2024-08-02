import printPlayers from "../utils/printPlayers.js"

export default class DamagePlayerHandler {
  constructor(
    socket,
    io,
    players
  ) {
    socket.on('damage-player', obj=> {
      const { idEntity, damage } = obj
      
      if (!players[idEntity]) return

      players[idEntity].life -= damage
      if(players[idEntity].life <= 0) {
        delete players[idEntity]
      }
      printPlayers(players)
    })
  } 
}