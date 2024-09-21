import { createSlice } from "@reduxjs/toolkit"
import { getCurrentFormattedDateTime } from "@utils/commonFunction"
import { setStadisticLocal } from "@utils/localStorage"

function getInitialState() {
  return {
    frequency: [],
    answer: [],
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
  pushResultGame,
} = stadisticSlice.actions

export const addFrequencyHistory = (mode, frequencyValue, cardId) => {
  return async (dispatch, getState) => {
    const freqCommand = {
      mode: mode,
      frequencyDetails: {
        cardId,
        value: frequencyValue,
        date: getCurrentFormattedDateTime(),
      },
    }
    dispatch(pushFrequencyInfo(freqCommand))
    setStadisticLocal(getState().stadistic)
  }
}

export const addAnswerHistory = (mode, isCorrect, timeSpent, cardId) => {
  return async (dispatch, getState) => {
    const currentState = getState()
    const resultGameCurrent = currentState.stadistic[mode].resultGame

    const answerHistory = {
      mode,
      answerDetails: {
        cardId,
        isCorrect,
        timeSpent,
        date: getCurrentFormattedDateTime(),
        currentGameResult: resultGameCurrent.length,
      },
    }
    dispatch(pushAnswerInfo(answerHistory))
    setStadisticLocal(getState().stadistic)
  }
}

export const addResultGame = (mode) => {
  return async (dispatch, getState) => {
    const stateGame = getState().game[mode]
    const resultHistory = {
      mode,
      resultDetails: {
        botCorrect: stateGame.correctBotAnswer,
        userCorrect: stateGame.correctSelectList.filter((c) => c === true)
          .length,
        totalAnswer: stateGame.listCardSort.length,
        difficulty: stateGame.botLevel,
        date: getCurrentFormattedDateTime(),
      },
    }
    dispatch(pushResultGame(resultHistory))
    setStadisticLocal(getState().stadistic)
  }
}

export default stadisticSlice.reducer
