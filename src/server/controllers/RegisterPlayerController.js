import createIdPlayer from "../factories/CreateIdPlayer.js"
import PlayerToFront from "../factories/CreatePlayerToFront.js"
import createPosition from "../factories/CreatePosition.js"

export default class RegisterPlayerController {
  constructor(
    app,
    io,
    player,
    players
  ) {
    app.get('/registerPlayer', (req, res) => {
      const idPlayer = createIdPlayer(players)
      const position = createPosition()

      player.id = idPlayer
      player.position = position

      players.push({...player})

      console.log(players);

      io.emit('new-player', { _player: PlayerToFront(player) })
      res.status(200).send({idPlayer, players})
    })
  }
}