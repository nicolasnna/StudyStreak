import { BotLevelProb } from "./constants"

export const FisherYates = (array) => {
  let newArray = array.slice()

  const endArray = Math.floor(array.length / 2)
  for (let i = 0; i < endArray; i++) {
    const firstElement = Math.floor(Math.random() * array.length)
    const secondElement = Math.floor(Math.random() * array.length)
    const tmp = newArray[firstElement]
    newArray[firstElement] = newArray[secondElement]
    newArray[secondElement] = tmp
  }

  return newArray.filter((content) => content !== undefined)
}

export const calculateBotAnswer = (botLevel) => {
  const percentage = BotLevelProb[botLevel]
  const isCorrectAnswer = percentage >= Math.random()
  return isCorrectAnswer ? 1 : 0
}

export const sortCards = (card) => {
  const newExpandedCards = []

  card.forEach((c) => {
    const { revision_frequency } = c
    switch (revision_frequency) {
      case 1:
        newExpandedCards.push(c, c, c, c)
        break
      case 0:
        newExpandedCards.push(c, c)
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

export const createOption = (actualCard, cards) => {
  let indexA = Math.floor(Math.random() * cards.length)
  while (cards[indexA].id === actualCard.id) {
    indexA = Math.floor(Math.random() * cards.length)
  }
  let indexB = Math.floor(Math.random() * cards.length)
  while (cards[indexB].id === actualCard.id || indexA === indexB) {
    indexB = Math.floor(Math.random() * cards.length)
  }
  const optionArray = FisherYates([cards[indexA], actualCard, cards[indexB]])
  return optionArray
}

export const getCurrentFormattedDateTime = () => {
  const now = new Date()
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    seconds: now.getSeconds(),
  }
}
