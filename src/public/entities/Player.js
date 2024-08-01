import Entity from "./Entity.js"

export default class Player extends Entity {
  constructor(id, body, position, game, itsMe, direction) {
    super(id, body, position, game, 20)
    this.itsMe = itsMe
    this.direction = direction
    this.velocity = 10
  }

  move(_direction) {
    const movements = {
      top: {...this.position, y: this.position.y - this.velocity},
      left: {...this.position, x: this.position.x - this.velocity},
      bottom: {...this.position, y: this.position.y + this.velocity},
      right: {...this.position, x: this.position.x + this.velocity},
    }
    this.direction = _direction
    this.position = movements[_direction]
    this.game.updateScreen()
  }

  addOnGame(color) {
    super.addOnGame(color)
    this.renderGun('top')
  }

  renderGun() {
    this.body.fillStyle = '#000'
    const gunSize = this.size/3
    const mid = (this.size-gunSize)/2

    const _direction = {
      top: [this.position.x+mid, this.position.y, gunSize, gunSize],
      bottom: [this.position.x+mid, this.position.y+this.size-gunSize, gunSize, gunSize],
      left: [this.position.x, this.position.y+mid, gunSize, gunSize],
      right: [this.position.x+this.size-gunSize, this.position.y+mid, gunSize, gunSize]
    }
    
    this.body.fillRect(..._direction[this.direction])
  }

  onCollision(typeEntity, idEntity) {
    console.log('player colidiu com: ', typeEntity);
  }
}