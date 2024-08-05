export const FisherYates = (array) => {
  let newArray = array.slice()

  const endArray = Math.floor(array.length / 2) 
  for (let i = 0; i<endArray; i++){
    const firstElement = Math.floor(Math.random() * (array.length))
    const secondElement = Math.floor(Math.random() * (array.length))
    const tmp = newArray[firstElement]
    newArray[firstElement] = newArray[secondElement]
    newArray[secondElement] = tmp
  }

  return newArray.filter(content => content !== undefined)
}

export const sortCards = (card) => {
  const newExpandedCards = []
  
  card.forEach(c => {
    const { revision_frequency } = c
    switch (revision_frequency) {
      case 1:
        newExpandedCards.push(c,c,c,c)
        break
      case 0:
        newExpandedCards.push(c,c)
        break
      case -1:
        newExpandedCards.push(c)
        break
      default:
        break
      }

    })
    const sortExpandedCards = FisherYates(newExpandedCards)
    return sortExpandedCards
  }
