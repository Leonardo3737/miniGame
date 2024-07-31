export default class MovPlayerHandler {
  constructor(
    socket,
    io,
    players
  ) {
    socket.on('mov-player', (obj) => {
      const player = players[obj.id]

      const movements = {
        top: () => player.position.y += -10,
        left: () => player.position.x += -10,
        bottom: () => player.position.y += 10,
        right: () => player.position.x += 10,
      }

      const execMovement = movements[obj.movement]
      execMovement()

      io.emit('update-screen', obj)
    })
  }
}