export default class Game {
  entitiesList = {
    players: {},
    fruits: {},
    bullets: {}
  }

  idEntitiesList = {
    players: [],
    fruits: [],
    bullets: []
  }

  constructor(screenGame, genericBody) {
    this.screenGame = screenGame
    this.genericBody = genericBody
  }

  addEntity(entity, type) {
    this.entitiesList[type][entity.id] = entity
    this.idEntitiesList[type].push(entity.id)
  }

  removeEntity(id, type) {
    delete this.entitiesList[type][id]

    const index = this.idEntitiesList[type].findIndex(idEntity => idEntity === id)
    this.idEntitiesList[type].splice(index, 1)

    this.updateScreen()
  }

  renderGame() {
    this.idEntitiesList.fruits.map(idFruit => this.entitiesList.fruits[idFruit].addOnGame('rgb(50, 255, 50)'))
    this.idEntitiesList.bullets.map(idBullet => this.entitiesList.bullets[idBullet].addOnGame('rgb(200, 150, 50)'))

    this.idEntitiesList.players.map(idPlayer => {
      const player = this.entitiesList.players[idPlayer]
      player.addOnGame(player.itsMe ? 'rgb(255, 100, 100)' : 'rgba(0,0,0,0.4)')
    })
  }

  updateScreen() {
    this.genericBody.clearRect(0, 0, this.screenGame.width, this.screenGame.height)
    this.renderGame()
  }

  movePlayer(direction, idPlayer) {
    const playerToMove = this.entitiesList.players[idPlayer]
    const { position } = playerToMove

    if (!this.verifyMov(direction, position, playerToMove.size)) return false

    playerToMove.move(direction)

    playerToMove.isCollided()
    return true
  }

  verifyMov(direction, position, size) {
    const maxWidth = screenGame.width - size - 1
    const maxHeight = screenGame.height - size - 1
    let aux =
      (direction === 'left' && position.x > 1) ||
      (direction === 'right' && position.x < maxWidth) ||
      (direction === 'top' && position.y > 1) ||
      (direction === 'bottom' && position.y < maxHeight)
    return aux
  }

  addPointToPlayer(point, idPlayer) {
    /* const playerToAddPoint = this.entitiesList.players[idPlayer]
    playerToAddPoint.size += point
    this.updateScreen() */
  }
} 