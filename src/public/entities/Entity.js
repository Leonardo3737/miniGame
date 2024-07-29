export default class Entity {
  constructor(id, body, position, game, size) {
    this.id = id
    this.body = body
    this.position = position
    this.game = game
    this.size = size
    this.calcArea()
  }

  calcArea() {
    this.area = {
      x: [this.position.x, this.position.x + this.size],
      y: [this.position.y, this.position.y + this.size]
    }
  }

  addOnGame(color) {
    this.body.fillStyle = color
    this.body.fillRect(this.position.x, this.position.y, this.size, this.size)
  }
}