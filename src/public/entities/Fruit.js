class Fruit {
  size = 10

  constructor(id, body, position, game) {
    this.id = id
    this.body = body
    this.position = position
    this.game = game
    this.calcArea()
  }

  addOnGame() {
    this.body.fillStyle = 'rgb(50, 255, 50)'
    this.body.fillRect(this.position.x, this.position.y, this.size, this.size)
  }

  calcArea() {
    this.area = {
      x: [this.position.x, this.position.x + this.size],
      y: [this.position.y, this.position.y + this.size]
    }
  }

  collided(playerArea) {
    if(
      playerArea.x[0] <= this.area.x[0] &&
      playerArea.x[1] >= this.area.x[1] &&
      playerArea.y[0] <= this.area.y[0] &&
      playerArea.y[0] >= this.area.y[0] 
    ) {
      console.log('colidiu');
    }
  }
}