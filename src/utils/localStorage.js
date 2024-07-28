export const addCardLocal = (newCard) => {
  const savedLocal = localStorage.getItem("flashCards")
  if (savedLocal) {
    const savedCards = JSON.parse(savedLocal)
    const cards = Array.isArray(savedCards) ? [...savedCards, newCard] : [savedCards, newCard]
    localStorage.setItem("flashCards", JSON.stringify(cards))
  } else {
    localStorage.setItem("flashCards", JSON.stringify(newCard))
  }
}

export const deleteCardLocal = (id) => {
  const savedLocal = localStorage.getItem("flashCards")
  const listCard = JSON.parse(savedLocal).filter(c => c.id !== id)
  localStorage.setItem('flashCards', JSON.stringify(listCard))
}

export const setCardLocal = (cards) => {
  localStorage.setItem('flashCards', JSON.stringify(cards))
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
  localStorage.setItem('categoryCards', JSON.stringify(categories))
}

export const getCategoryLocal = () => {
  const categoryLocal = localStorage.getItem('categoryCards')
  if (categoryLocal) {
    const saved = JSON.parse(categoryLocal)
    const savedValidated = Array.isArray(saved) ? saved : [saved]
    return savedValidated
  }
  return []
}