import Entity from "./Entity.js"

export default class Player extends Entity {
  

  constructor(id, body, position, game, itsMe) {
    super(id, body, position, game, 20)
    this.itsMe = itsMe
  }

  moveY(direction) {
    this.position.y += direction
    this.game.updateScreen()
  }

  moveX(direction) {
    this.position.x += direction
    this.game.updateScreen()
  }
}