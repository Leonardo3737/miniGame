export default class Game {
  entitiesList = {
    'players': [],
    'fruits': []
  }

  constructor(screenGame, genericBody) {
    this.screenGame = screenGame
    this.genericBody = genericBody
  }

  addEntity(entity, type) {
    this.entitiesList[type].push(entity)
  }

  removeEntity(id, type) {
    const index = this.entitiesList[type].findIndex(player => player.id === id)
    this.entitiesList[type].splice(index, 1)
    this.updateScreen()
  }

  renderGame() {
    this.entitiesList.fruits.map(fruit => fruit.addOnGame('rgb(50, 255, 50)'))
    this.entitiesList.players.map(player => player.addOnGame(player.itsMe ? 'rgb(255, 100, 100)' : 'rgba(0,0,0,0.4)'))
  }

  updateScreen() {
    this.genericBody.clearRect(0, 0, this.screenGame.width, this.screenGame.height)
    this.renderGame()
  }

  movementEvent(direction, idPlayer) {
    const playerToMove = this.entitiesList.players.find(p => p.id === idPlayer)
    const position = { ...playerToMove.position }

    if (!this.verifyMov(direction, position, playerToMove.size)) return false

    if (direction === 'top') playerToMove.moveY(-10);
    if (direction === 'left') playerToMove.moveX(-10);
    if (direction === 'bottom') playerToMove.moveY(10);
    if (direction === 'right') playerToMove.moveX(10);

    playerToMove.calcArea()
    this.entitiesList.fruits.map(fruit => fruit.collided({ area: playerToMove.area, id: playerToMove.id }))
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
    const playerToAddPoint = this.entitiesList.players.find(p => p.id === idPlayer)
    playerToAddPoint.size += point
    this.updateScreen()
  }
} 