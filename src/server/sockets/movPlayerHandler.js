export default class MovPlayerHandler {
  constructor(
    socket, 
    io, 
    obj, 
    players
  ) {
    socket.on('mov-player', (obj)=> {
      players.map(p=> { 
        if(p.id === obj.id) {
          switch (obj.movement) {
            case 'top':
              p.position.y += -10;
              break;
            case 'left':
              p.position.x += -10;
              break;
            case 'bottom':
              p.position.y += 10;
              break;
            case 'right':
              p.position.x += 10;
              break;
          }
        }
      })
      io.emit('update-screen', obj)
    })
  }
}