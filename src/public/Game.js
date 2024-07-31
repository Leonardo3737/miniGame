export default class Game {
  entitiesList = {
    players: {},
    fruits: {}
  }

  idEntitiesList = {
    players: [],
    fruits: []
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

    const movements = {
      top: () => playerToMove.moveY(-10),
      left: () => playerToMove.moveX(-10),
      bottom: () => playerToMove.moveY(10),
      right: () => playerToMove.moveX(10),
    }

    if (!this.verifyMov(direction, position, playerToMove.size)) return false

    const movement = movements[direction]
    movement()

    playerToMove.calcArea()
    this.idEntitiesList.fruits.map(idFruit => this.entitiesList.fruits[idFruit].collided({ area: playerToMove.area, id: playerToMove.id }))
    return true
  }

  verifyMov(direction, position, playerSize) {
    const maxWidth = screenGame.width - playerSize - 1
    const maxHeight = screenGame.height - playerSize - 1
    let aux =
      (direction === 'left' && position.x > 1) ||
      (direction === 'right' && position.x < maxWidth) ||
      (direction === 'top' && position.y > 1) ||
      (direction === 'bottom' && position.y < maxHeight)
    return aux
  }

  addPointToPlayer(point, idPlayer) {
    const playerToAddPoint = this.entitiesList.players[idPlayer]
    playerToAddPoint.size += point
    this.updateScreen()
  }
} 