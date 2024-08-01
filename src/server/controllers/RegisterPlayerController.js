import Player from "../entities/Player.js"
import createIdPlayer from "../factories/CreateIdPlayer.js"
import PlayerToFront from "../factories/CreatePlayerToFront.js"
import createPosition from "../factories/CreatePosition.js"

export default class RegisterPlayerController {
  constructor(
    app,
    io,
    idPlayer,
    players
  ) {
    app.get('/registerPlayer', (req, res) => {
      idPlayer.id = createIdPlayer(players)
      const position = createPosition()

      const player = new Player(idPlayer.id, position)

      players[idPlayer.id] = player

      //console.clear()
      console.log('|----- Jogadores Conectados -----|');
      console.table(players, ['position', 'direction']);

      io.emit('new-player', { _player: PlayerToFront(player)})
      res.status(200).send({idPlayer: idPlayer.id, players})
    })
  }
}