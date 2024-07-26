export default class DisconnectHandler {
  constructor(
    socket,
    io,
    idPlayer,
    players
  ) {
    socket.on('disconnect', () => {
      io.emit('exit-player', idPlayer)
      const index = players.findIndex((e) => e.id === idPlayer)
      players.splice(index, 1)
    })
  }
}