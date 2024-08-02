export default class MovPlayerHandler {
  constructor(
    socket,
    io,
    players
  ) {
    socket.on('player-action', (obj) => {
      console.log(obj);
      const player = players[obj.id]

      const movements = {
        move: {
          top: () => player.moveY(-10),
          left: () => player.moveX(-10),
          bottom: () => player.moveY(10),
          right: () => player.moveX(10),
        },
        shot: {
          " ": ()=>{}
        }
      }

      const execMovement = movements[obj.type][obj.movement]
      execMovement()

      io.emit('update-screen', obj)
    })
  }
}