class Player {
  playerSize = 20

  constructor(id, body, posX, posY, game) {
    this.id = id
    this.body = body
    this.posX = posX
    this.posY = posY
    this.game = game
  }

  addOnGame() {
    this.body.fillRect(this.posX, this.posY, this.playerSize, this.playerSize)
  }


  moveY(direction) {
    this.posY += direction
    this.game.updateScreen()
  }

  moveX(direction) {
    this.posX += direction
    this.game.updateScreen()
  }
}