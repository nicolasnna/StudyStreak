export const addCardLocal = (newCard) => {
  const savedLocal = localStorage.getItem("flashCards")
  if (savedLocal) {
    const savedCards = JSON.parse(savedLocal)
    const cards = Array.isArray(savedCards)
      ? [...savedCards, newCard]
      : [savedCards, newCard]
    localStorage.setItem("flashCards", JSON.stringify(cards))
  } else {
    localStorage.setItem("flashCards", JSON.stringify(newCard))
  }
}

export const deleteCardLocal = (id) => {
  const savedLocal = localStorage.getItem("flashCards")
  const listCard = JSON.parse(savedLocal).filter((c) => c.id !== id)
  localStorage.setItem("flashCards", JSON.stringify(listCard))
}

export const setCardLocal = (cards) => {
  localStorage.setItem("flashCards", JSON.stringify(cards))
}

export const updateCardLocal = (cardUpdated) => {
  const savedLocal = localStorage.getItem("flashCards")
  const listCard = JSON.parse(savedLocal)
  const newListCard = listCard.map((c) =>
    c.id === cardUpdated.id ? cardUpdated : c
  )
  localStorage.setItem("flashCards", JSON.stringify(newListCard))
}

export const getCardLocal = () => {
  const cardsLocal = localStorage.getItem("flashCards")
  if (cardsLocal) {
    const saved = JSON.parse(cardsLocal)
    const savedValidated = Array.isArray(saved) ? saved : [saved]
    return savedValidated
  }
  return []
}

export const setCategoryLocal = (categories) => {
  localStorage.setItem("categoryCards", JSON.stringify(categories))
}

export const getCategoryLocal = () => {
  const categoryLocal = localStorage.getItem("categoryCards")
  if (categoryLocal) {
    const saved = JSON.parse(categoryLocal)
    const savedValidated = Array.isArray(saved) ? saved : [saved]
    return savedValidated
  }
  return []
}

export const setStadisticLocal = (stadistic) => {
  localStorage.setItem("stadistics", JSON.stringify(stadistic))
}

export const getStadisticLocal = () => {
  const stadisticLocal = localStorage.getItem("stadistics")
  if (stadisticLocal) {
    const saved = JSON.parse(stadisticLocal)
    const savedValidated = Array.isArray(saved) ? saved : [saved]
    return savedValidated
  }
  return []
}
