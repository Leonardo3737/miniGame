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

  isCollided() {
    const listEntities = Object.keys(this.game.entitiesList)
    listEntities.map(tEntity => {
      this.game.idEntitiesList[tEntity].map(idEntity => {
        const entity = this.game.entitiesList[tEntity][idEntity]
        if (
          entity.area.x[0] > this.area.x[1] ||
          entity.area.x[1] < this.area.x[0] ||
          entity.area.y[0] > this.area.y[1] ||
          entity.area.y[1] < this.area.y[0] ||
          entity.id === this.id
        ) return
        this.onCollision(tEntity, idEntity)
      })
    })
  }

  onCollision(typeEntity, idEntity) { }
} 