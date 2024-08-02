import Bullet from "./entities/Bullet.js"

export default class Game {
  entitiesList = {
    players: {},
    fruits: {},
    bullets: {}
  }

  idEntitiesList = {
    players: [],
    fruits: [],
    bullets: []
  }

  constructor(screenGame, genericBody, onDamage, updateLifeBar) {
    this.screenGame = screenGame
    this.genericBody = genericBody
    this.onDamage = onDamage
    this.updateLifeBar = updateLifeBar
  }

  addEntity(entity, type) {
    this.entitiesList[type][entity.id] = entity
    this.idEntitiesList[type].push(entity.id)
  }

  removeEntity(id, type) {
    delete this.entitiesList[type][id]

    const index = this.idEntitiesList[type].findIndex(idEntity => idEntity === id)
    this.idEntitiesList[type].splice(index, 1)

    this.updateScreen()
  }

  renderGame() {
    this.idEntitiesList.fruits.map(idFruit => this.entitiesList.fruits[idFruit].addOnGame('rgb(50, 255, 50)'))
    this.idEntitiesList.bullets.map(idBullet => this.entitiesList.bullets[idBullet].addOnGame('rgb(200, 150, 50)'))

    this.idEntitiesList.players.map(idPlayer => {
      const player = this.entitiesList.players[idPlayer]
      player.addOnGame(player.itsMe ? 'rgb(255, 100, 100)' : 'rgba(0,0,0,0.4)')
    })
  }

  updateScreen() {
    this.genericBody.clearRect(0, 0, this.screenGame.width, this.screenGame.height)
    this.renderGame()
  }

  playerAction(comand, idPlayer) {
    const [action] = comand
    const playerToAction = this.entitiesList.players[idPlayer]

    if(!playerToAction) return false

    const { direction: playerDirection, position } = playerToAction

    const actions = {
      move: () => this.playerMove(playerToAction, comand, position),
      shot: () => {
        const idBullet = this.idEntitiesList.bullets.length

        const gunSize = playerToAction.size / 3
        const mid = (playerToAction.size - gunSize) / 2
        const positions = {
          top: {x:position.x + mid, y: position.y + playerToAction.size - gunSize},
          bottom: {x:position.x + mid, y: position.y},
          right: {x:position.x, y: position.y + mid},
          left: {x:position.x + playerToAction.size - gunSize, y:position.y + mid}
        }
        const bullet = new Bullet(this.createId(), this.genericBody, positions[playerDirection], this, idPlayer, playerDirection)
        this.addEntity(bullet, 'bullets')
        bullet.subscribe(this.onDamage)
        return true
      } 
    }
    return actions[action]()
  }

  playerMove(player, comand, position) {
    const [action, movDirection] = comand

    if (!this.verifyMov(movDirection, position, player.size)) return false
    player[action](movDirection)

    player.isCollided()
    return true
  }

  verifyMov(direction, position, size) {
    const maxWidth = screenGame.width - size - 1
    const maxHeight = screenGame.height - size - 1
    let aux =
      (direction === 'left' && position.x > 1) ||
      (direction === 'right' && position.x < maxWidth) ||
      (direction === 'top' && position.y > 1) ||
      (direction === 'bottom' && position.y < maxHeight)
    return aux
  }

  addPointToPlayer(point, idPlayer) {
    /* const playerToAddPoint = this.entitiesList.players[idPlayer]
    playerToAddPoint.size += point
    this.updateScreen() */
  }

  createId() {
    const id = parseInt(Math.random()*1000000)
  
    if(id === 0 || this.idEntitiesList.bullets.includes(id)) {
      return genereteIdPlayer()
    }
    return id
  }

  damagePlayer(idPlayer, damage) {
    console.log(damage);
    this.entitiesList.players[idPlayer].life -= damage
    if(this.entitiesList.players[idPlayer].life <= 0) {
      this.removeEntity(idPlayer, 'players')
    }
    this.updateLifeBar()
  }
} 