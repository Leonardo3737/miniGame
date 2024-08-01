import Entity from "./Entity.js"

export default class Fruit extends Entity {

  constructor(id, body, position, game) {
    super(id, body, position, game, 10)
  }
}