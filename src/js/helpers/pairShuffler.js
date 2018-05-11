const pairShuffler = (numPairs) => {

  // fully random by @BetonMAN
  const shuffleArray = arr => (
    arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
  )

  let cards = []

  for (let i = 0; i < numPairs; i++) {
    cards.push(i)
    cards.push(i)
  }

  return shuffleArray(cards)
}

export default pairShuffler