class Game {
  playerList = []
  screenGame
  genericBody

  constructor(screenGame, genericBody) {
    this.playerList
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

  movementEvent(key, idPlayer) {
    const playerToMove = this.playerList.find(p => p.id === idPlayer)
    const position = {x: playerToMove.posX, y : playerToMove.posY}
    switch (key) {
      case 'w':
        if(!this.verifyMov('top', position)) return
        playerToMove.moveY(-10);
        break;
      case 'a':
        if(!this.verifyMov('left', position)) return
        playerToMove.moveX(-10);
        break;
      case 's':
        if(!this.verifyMov('bottom', position)) return
        playerToMove.moveY(10);
        break;
      case 'd':
        if(!this.verifyMov('right', position)) return
        playerToMove.moveX(10);
        break;
    }
  }

  verifyMov(direction, position) {
    let aux = 
    (direction === 'left' && position.x > 1) || 
    (direction === 'right' && position.x < 579) ||
    (direction === 'top' && position.y > 1) ||
    (direction === 'bottom' && position.y < 579)
    return aux
  } 
}