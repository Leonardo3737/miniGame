export default class Player {
  id
  position
  direction
  life = 100

  constructor(id, position) {
    this.direction = 'top'
    this.id = id
    this.position = position
  }

  moveY = (_direction) => {
    this.direction = _direction > 0 ? 'bottom': 'top'
    this.position.y += _direction
  }

  moveX = (_direction) => {
    this.direction = _direction > 0 ? 'right': 'left'
    this.position.x += _direction
  }
}