export default function printPlayers(players) {

  console.clear()
  console.log('|----- Jogadores Conectados -----|');
  console.table(players, ['position', 'direction', 'life']);
}