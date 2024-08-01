import Entity from "./Entity.js";

export default class Bullet extends Entity{
  constructor(id, body, position, game) {
    super(id, body, position, game, 10)
    this.movement()
  }

  movement() {
    if(!this.game.verifyMov('top', this.position, this.size)) {
      this.game.removeEntity(this.id, 'bullet')
      return
    }
    console.log('andarsssssssssss');
    this.position.x += 1
    this.isCollided()
    this.game.updateScreen()
    requestAnimationFrame(()=> this.movement())
  }

  onCollision() {
    this.game.removeEntity(this.id, 'bullet')
  }
}