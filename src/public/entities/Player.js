class Player {
  size = 20

  constructor(id, body, position, game, itsMe) {
    this.id = id
    this.body = body
    this.position = position
    this.game = game
    this.itsMe = itsMe
    this.calcArea()
  }

  addOnGame() {
    if(this.itsMe) {
      this.body.fillStyle = 'rgb(255, 100, 100)'
    } else {
      this.body.fillStyle = 'rgba(0,0,0,0.4)'
    }
    this.body.fillRect(this.position.x, this.position.y, this.size, this.size)
  }


  moveY(direction) {
    this.position.y += direction
    this.game.updateScreen()
  }

  moveX(direction) {
    this.position.x += direction
    this.game.updateScreen()
  }

  calcArea() {
    this.area = {
      x: [this.position.x, this.position.x + this.size],
      y: [this.position.y, this.position.y + this.size]
    }
  }
}