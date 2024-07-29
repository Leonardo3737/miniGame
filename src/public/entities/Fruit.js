import Entity from "./Entity.js"

export default class Fruit extends Entity {

  constructor(id, body, position, game) {
    super(id, body, position, game, 10)
  }

  collided(player) {
    if (
      player.area.x[0] > this.area.x[0] ||
      player.area.x[1] < this.area.x[1] ||
      player.area.y[0] > this.area.y[0] ||
      player.area.y[1] < this.area.y[1]
    ) return
    this.game.addPointToPlayer(this.size, player.id)
    this.game.removeEntity(this.id, 'fruits')
  }
}