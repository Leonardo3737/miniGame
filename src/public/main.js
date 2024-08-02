import KeyboardInput from './controls/KeyboardInput.js'
import Bullet from './entities/Bullet.js'
import Fruit from './entities/Fruit.js'
import Player from './entities/Player.js'
import Game from './Game.js'

const screenSize = 900

const lifeBar = document.getElementById('lifeBar')
const screenGame = document.getElementById('screenGame')
screenGame.width = screenSize
screenGame.height = screenSize
const socket = io()
const genericBody = screenGame.getContext('2d')
const game = new Game(screenGame, genericBody, onDamage, updateLifeBar)


const keyboardInput = new KeyboardInput(document)

let player


function addFruit() {
  game.addEntity(new Fruit(1, genericBody, { x: 50, y: 345 }, game), 'fruits')
  /* game.addEntity(new Fruit(2, genericBody, { x: 80, y: 165 }, game), 'fruits')
  game.addEntity(new Fruit(3, genericBody, { x: 203, y: 876 }, game), 'fruits')
  game.addEntity(new Fruit(4, genericBody, { x: 508, y: 214 }, game), 'fruits')
  game.addEntity(new Fruit(5, genericBody, { x: 347, y: 643 }, game), 'fruits')
  game.addEntity(new Fruit(6, genericBody, { x: 324, y: 432 }, game), 'fruits')
  game.addEntity(new Fruit(7, genericBody, { x: 732, y: 463 }, game), 'fruits')
  game.addEntity(new Fruit(8, genericBody, { x: 98, y: 123 }, game), 'fruits')
  game.addEntity(new Fruit(9, genericBody, { x: 893, y: 654 }, game), 'fruits')
  game.addEntity(new Fruit(10, genericBody, { x: 50, y: 890 }, game), 'fruits') */
}

document.addEventListener('DOMContentLoaded', async () => {
  addFruit()
  const promise = await fetch('http://localhost:3000/registerPlayer')
  const res = await promise.json()

  const auxPlayer = res.players[res.idPlayer]

  console.log(auxPlayer);
  player = new Player(auxPlayer.id, genericBody, auxPlayer.position, game, true, auxPlayer.direction)
  
  updateLifeBar() 


  game.addEntity(player, 'players')
  keyboardInput.subscribe(key => eventKeyPress(key, auxPlayer.id))

  const idList = Object.keys(res.players)

  idList.map(id => {
    let auxId = parseInt(id)
    if (auxId === res.idPlayer) return
    let auxPlayer = new Player(auxId, genericBody, res.players[id].position, game, false, res.players[id].direction)
    game.addEntity(auxPlayer, 'players')
  })
  game.renderGame()
})


socket.on('new-player', ({ _player }) => {
  if (!player) return
  let auxPlayer = new Player(_player.id, genericBody, _player.position, game, false, _player.direction)

  game.addEntity(auxPlayer, 'players')
  game.updateScreen()
})

socket.on('disconnect', () => {
  game.removeEntity(player.id, 'players')
  player = null
  location.reload();
})

socket.on('exit-player', (id) => {
  game.removeEntity(id, 'players')
})

socket.on('update-screen', (obj) => {
  if (obj.id === player.id) return
  game.playerAction([obj.type, obj.movement], parseInt(obj.id))
  game.updateScreen()
})

function eventKeyPress(key, id) {
  const comands = {
    'w': ['move', 'top'],
    'a': ['move', 'left'],
    's': ['move', 'bottom'],
    'd': ['move', 'right'],
    ' ': ['shot', ' ']
  }

  const keyValids = Object.keys(comands)

  if (!keyValids.includes(key) || !game.playerAction(comands[key], id)) return
  const obj = {
    type: comands[key][0],
    id,
    movement: comands[key][1]
  }
  socket.emit('player-action', obj)
}

function onDamage(idEntity, damage) {
  socket.emit('damage-player', { idEntity, damage })
}

function updateLifeBar() {
  lifeBar.style.width = `${player.life}%`
}