export default function createPosition() {
  const randomNumber = () => parseInt(Math.random() * 1000)
  let x = randomNumber()
  while (x > 579 || x%10 !== 0) x = randomNumber()

  let y = randomNumber()
  while (y > 579 || y%10 !== 0) y = randomNumber()

  return { x, y }
}