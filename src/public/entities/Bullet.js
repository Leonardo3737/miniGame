import Entity from "./Entity.js";

export default class Bullet extends Entity {
  damage = 20
  vel = 5
  isDestory = false
  observes = []
  
  constructor(id, body, position, game, idPlayer, direction) {
    super(id, body, position, game, 20/3)
    this.idPlayer = idPlayer
    this.movement(direction)
    
  }

  movement(direction) {
    if (!this.game.verifyMov(direction, this.position, this.size) || this.isDestory) {
      this.game.removeEntity(this.id, 'bullets')
      return
    }
    const directions = {
      top: () => { this.position.y -= this.vel },
      bottom: () => { this.position.y += this.vel },
      right: () => { this.position.x += this.vel },
      left: () => { this.position.x -= this.vel },
    }
    this.vel = 20
    directions[direction]()
    this.isCollided()
    this.game.updateScreen()
    requestAnimationFrame(() => this.movement(direction))
  }

  subscribe(observe) {
    this.observes.push(observe)
  }

  notifyAll(idEntity) {
    this.observes.map(observe => observe(idEntity, this.damage))
  }

  onCollision(tEntity, idEntity) {
    this.isDestory = true
    if(tEntity !== 'players') return
    this.game.damagePlayer(idEntity, this.damage)
    this.notifyAll(idEntity)
  }

  isCollided() {
    this.calcArea()
    const listEntities = Object.keys(this.game.entitiesList)
    listEntities.map(tEntity => {
      this.game.idEntitiesList[tEntity].map(idEntity => {
        const entity = this.game.entitiesList[tEntity][idEntity]
        if ( 
          entity.area.x[0] > this.area.x[1] ||
          entity.area.x[1] < this.area.x[0] ||
          entity.area.y[0] > this.area.y[1] ||
          entity.area.y[1] < this.area.y[0] ||
          entity.id === this.id || 
          entity.id === this.idPlayer
        ) return
        this.onCollision(tEntity, idEntity)
      })
    }) 
  }
}