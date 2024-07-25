class KeyboardInput {
  //playerId
  document
  observes =  []

  constructor(_document) {
    //this.playerId = playerId
    this.document = _document
    this.document.addEventListener('keypress', (event) => this.notifyAll(event))
  }

  subscribe(observe) {
    this.observes.push(observe)
  }

  notifyAll(event) {
    this.observes.map(observe => observe(event.key))
  }
}