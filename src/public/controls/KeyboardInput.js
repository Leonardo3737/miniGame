export default class KeyboardInput {
  //playerId
  document
  pressObserves = []

  constructor(_document) {
    //this.playerId = playerId
    this.document = _document
    this.document.addEventListener('keypress', (event) => this.notifyAll(event))
  }

  subscribe(observe) {
    this.pressObserves.push(observe)
  }

  notifyAll(event) {
    this.pressObserves.map(observe => {
      const auxKey = event.key.toLowerCase()
      observe(auxKey)
    })
  }
}