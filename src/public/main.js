import KeyboardInput from './controls/KeyboardInput.js'
import Fruit from './entities/Fruit.js'
import Player from './entities/Player.js'
import Game from './Game.js'

const screenSize = 900

const screenGame = document.getElementById('screenGame')
screenGame.width = screenSize
screenGame.height = screenSize
const socket = io()
const genericBody = screenGame.getContext('2d')
const game = new Game(screenGame, genericBody)

const keyboardInput = new KeyboardInput(document)

let player


function addFruit() {
  game.addEntity(new Fruit(1, genericBody, { x: 50, y: 345 }, game), 'fruits')
  game.addEntity(new Fruit(2, genericBody, { x: 80, y: 165 }, game), 'fruits')
  game.addEntity(new Fruit(3, genericBody, { x: 203, y: 876 }, game), 'fruits')
  game.addEntity(new Fruit(4, genericBody, { x: 508, y: 214 }, game), 'fruits')
  game.addEntity(new Fruit(5, genericBody, { x: 347, y: 643 }, game), 'fruits')
  game.addEntity(new Fruit(6, genericBody, { x: 324, y: 432 }, game), 'fruits')
  game.addEntity(new Fruit(7, genericBody, { x: 732, y: 463 }, game), 'fruits')
  game.addEntity(new Fruit(8, genericBody, { x: 98, y: 123 }, game), 'fruits')
  game.addEntity(new Fruit(9, genericBody, { x: 893, y: 654 }, game), 'fruits')
  game.addEntity(new Fruit(10, genericBody, { x: 50, y: 890 }, game), 'fruits')
}

document.addEventListener('DOMContentLoaded', async () => {
  addFruit()
  const promise = await fetch('http://192.168.100.72:3000/registerPlayer')
  const res = await promise.json()

  const auxPlayer = res.players.find(p => p.id === res.idPlayer)

  player = new Player(auxPlayer.id, genericBody, auxPlayer.position, game, true)
  game.addEntity(player, 'players')
  keyboardInput.subscribe(key => movementPlayer(key, auxPlayer.id))

  console.log(res.players);

  res.players.map(p => {
    if (p.id === res.idPlayer) return
    let auxPlayer = new Player(p.id, genericBody, p.position, game, false)
    game.addEntity(auxPlayer, 'players')
  })
  game.renderGame()
})

socket.on('new-player', ({ _player, players }) => {
  if (!player) return

  let auxPlayer = new Player(_player.id, genericBody, _player.position, game, false)

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
  game.entitiesList.players.map(p => {
    if (obj.id !== p.id || obj.id === player.id) return
    game.movementEvent(obj.movement, obj.id)
  })
  game.updateScreen()
})

function movementPlayer(key, id) {
  const adapterMov = {
    'w': 'top',
    'a': 'left',
    's': 'bottom',
    'd': 'right',
  }
  if (game.movementEvent(adapterMov[key], id)) {
    const obj = {
      id,
      movement: adapterMov[key]
    }
    socket.emit('mov-player', obj)
  }
}