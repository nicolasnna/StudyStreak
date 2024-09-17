import { createSlice } from "@reduxjs/toolkit"

function getInitialState() {
  return {
    frequency: [],
    answer: [],
    incorrectAnswer: [],
    spentTime: [],
    resultGame: [],
  }
}

const initialState = {
  multiple: getInitialState(),
  multipleInverse: getInitialState(),
  vsbot: getInitialState(),
}

const stadisticSlice = createSlice({
  name: "stadistic",
  initialState,
  reducers: {
    setStadistic(state, action) {
      return action.payload
    },
    pushFrequencyInfo(state, action) {
      const { mode, frequencyDetails } = action.payload
      state[mode].frequency.push(frequencyDetails)
    },
    pushAnswerInfo(state, action) {
      const { mode, answerDetails } = action.payload
      state[mode].answer.push(answerDetails)
    },
    pushIncorrectInfo(state, action) {
      const { mode, incorrectDetails } = action.payload
      state[mode].incorrectAnswer.push(incorrectDetails)
    },
    pushSpentTime(state, action) {
      const { mode, spentTimeDetails } = action.payload
      state[mode].spentTime.push(spentTimeDetails)
    },
    pushResultGame(state, action) {
      const { mode, resultDetails } = action.payload
      state[mode].resultGame.push(resultDetails)
    },
  },
})

export const {
  setStadistic,
  pushFrequencyInfo,
  pushAnswerInfo,
  pushIncorrectInfo,
  pushSpentTime,
  pushResultGame,
} = stadisticSlice.actions

export default stadisticSlice.reducer
