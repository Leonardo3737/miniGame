export default class Player {
  id
  position

  moveY(direction) {
    this.position.y += direction
    this.game.updateScreen()
  }

  moveX(direction) {
    this.position.x += direction
    this.game.updateScreen()
  }
}