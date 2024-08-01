export default class MovPlayerHandler {
  constructor(
    socket,
    io,
    players
  ) {
    socket.on('mov-player', (obj) => {
      const player = players[obj.id]

      const movements = {
        top: () => player.moveY(-10),
        left: () => player.moveX(-10),
        bottom: () => player.moveY(10),
        right: () => player.moveX(10),
      }

      const execMovement = movements[obj.movement]
      execMovement()

      io.emit('update-screen', obj)
    })
  }
}