export default function createIdPlayer(players) {
  const id = parseInt(Math.random()*10000)

  const idList = Object.keys(players)

  if(id === 0 || idList.includes(id)) {
    return genereteIdPlayer()
  }
  return id
}