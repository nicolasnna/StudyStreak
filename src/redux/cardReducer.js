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
    deleteCard(state, action) {
      return state.filter(c => c.id !== action.payload)
    }
  }
})

export const { setCards, addCard, deleteCard } = cardSlice.actions

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

export const deleteCardById = (id) => {
  return async dispatch => {
    dispatch(deleteCard(id))
    const savedLocal = localStorage.getItem("flashCards")
    const listCard = JSON.parse(savedLocal).filter(c => c.id !== id)
    localStorage.setItem('flashCards', JSON.stringify(listCard))
  }
}

export default cardSlice.reducer