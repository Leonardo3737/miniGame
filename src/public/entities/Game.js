class Game {
  playerList = []
  movementObserves = []

  constructor(screenGame, genericBody) {
    this.screenGame = screenGame
    this.genericBody = genericBody
  }

  addPlayer(player) {
    this.playerList.push(player)
  }

  removePlayer(id) {
    const index = this.playerList.findIndex( player => player.id === id)
    this.playerList.splice(index, 1)
    this.updateScreen()
  }

  renderGame() {
    this.playerList.map(player => player.addOnGame())
  }

  updateScreen() {
    this.genericBody.clearRect(0, 0, this.screenGame.width, this.screenGame.height)
    this.renderGame()
  }
  
  movementEvent(direction, idPlayer) {
    const playerToMove = this.playerList.find(p => p.id === idPlayer)
    const position = {...playerToMove.position}

    if(!this.verifyMov(direction, position)) return false
    
    playerToMove.calcArea()
    this.notifyAll(playerToMove.area)

    switch (direction) {
      case 'top':
        playerToMove.moveY(-10);
        break;
      case 'left':
        playerToMove.moveX(-10);
        break;
      case 'bottom':
        playerToMove.moveY(10);
        break;
      case 'right':
        playerToMove.moveX(10);
        break;
    }
    return true
  }

  verifyMov(direction, position) {
    let aux = 
    (direction === 'left' && position.x > 1) || 
    (direction === 'right' && position.x < 579) ||
    (direction === 'top' && position.y > 1) ||
    (direction === 'bottom' && position.y < 579)
    return aux
  } 

  subscribe(observe) {
    this.movementObserves.push(observe)
  }

  notifyAll(event) {
    this.movementObserves.map(observe => observe(event))
  }
}