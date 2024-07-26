export default function createIdPlayer(players) {
  const id = parseInt(Math.random()*10000)
  if(id === 0 || players.includes(id)) {
    return genereteIdPlayer()
  }
  return id
}