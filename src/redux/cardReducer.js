import { createSlice } from "@reduxjs/toolkit";
import { addCardLocal, deleteCardLocal } from "../utils/localStorage";

const generateRandomId = () => "_" + Math.random().toString(36).slice(2, 9);

const createFlashCard = ({
  id = "",
  question = "",
  answer = "",
  tags = [],
  difficulty = "",
  created_at = "",
  updated_at = "",
  comments = "",
  revision_frequency = 0
} = {}) => ({
  id,
  question,
  answer,
  tags,
  difficulty,
  created_at,
  updated_at,
  comments,
  revision_frequency
});

const cardSlice = createSlice({
  name: "card",
  initialState: [],
  reducers: {
    setCards(state, action) {
      return action.payload;
    },
    addCard(state, action) {
      state.push(action.payload);
    },
    deleteCard(state, action) {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const { setCards, addCard, deleteCard } = cardSlice.actions;

export const createCard = (card) => {
  return async (dispatch) => {
    const date = new Date();
    const cardWithId = {
      id: generateRandomId(),
      created_at: date.toLocaleString(),
      ...card,
    };
    const cardObject = createFlashCard(cardWithId)
    dispatch(addCard(cardObject));
    addCardLocal(cardObject);
  };
};

export const deleteCardById = (id) => {
  return async (dispatch) => {
    dispatch(deleteCard(id));
    deleteCardLocal(id);
  };
};

export default cardSlice.reducer;