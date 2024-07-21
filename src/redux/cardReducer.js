import { createSlice } from "@reduxjs/toolkit";

const generateRandomId = () => '_' + Math.random().toString(36).slice(2, 9)

export const cardSlice = createSlice({
  name: 'card',
  initialState: [],
  reducers: {
    setCards(state, action) {
      return action.payload
    },
    addCard(state, action) {
      state.push(action.payload)
    },
  }
})

export const { setCards, addCard } = cardSlice.actions

export const createCard = (card) => {
  return async dispatch => {
    const cardWithId = {
      id: generateRandomId(),
      ...card
    }
    dispatch(addCard(cardWithId))
    const savedLocal = localStorage.getItem("flashCards")
    if (savedLocal) {
      const savedCards = JSON.parse(savedLocal)
      const cards = Array.isArray(savedCards) ? [...savedCards, cardWithId] : [savedCards, cardWithId]
      localStorage.setItem("flashCards", JSON.stringify(cards))
    } else {
      localStorage.setItem("flashCards", JSON.stringify(cardWithId))
    }
  }
}

export default cardSlice.reducer