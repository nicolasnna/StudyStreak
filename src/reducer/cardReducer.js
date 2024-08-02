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
    updateCard(state, action) {
      return state.map(c => c.id === action.payload.id ? action.payload : c)
    },
    setFrequency(state, action) {
      return state.map(c => c.id === action.payload.id ? {...c, revision_frequency: action.payload.frequency} : c)
    }
  },
});

export const { setCards, addCard, deleteCard, updateCard, setFrequency } = cardSlice.actions;

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

export const modifyCardById = (actualContent, newContent) => {
  return async (dispatch) => {
    const date = new Date()
    const cardModify = {
      id: actualContent.id,
      answer: newContent.answer || actualContent.answer,
      question: newContent.question || actualContent.question,
      comments: newContent.comments || actualContent.comments,
      tags: newContent.tags || actualContent.tags,
      difficulty: newContent.difficulty || actualContent.difficulty,
      updated_at: date.toLocaleString()
    }
    dispatch(updateCard(cardModify))
  }
}

export const changeFrequencyById = (id, newFrequency) => {
  return async (dispatch) => {
    const command = {
      id: id,
      frequency: newFrequency
    }
    dispatch(setFrequency(command))
  }
}

export default cardSlice.reducer;