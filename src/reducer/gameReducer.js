import { createSlice } from "@reduxjs/toolkit"
import { createOption, sortCards } from "@utils/commonFunction"
import { ColorOption } from "@utils/constants"

function getInitialState() {
  return {
    start: false,
    listCardSort: [],
    currentIndex: 0,
    optionList: [],
    stateOption: [],
    correctSelectList: [],
    startTime: 0,
    auxTime: [],
  }
}

const initialState = {
  basic: getInitialState(),
  multiple: getInitialState(),
  multipleInverse: getInitialState(),
  vsbot: { ...getInitialState(), botLevel: -1, correctBotAnswer: 0 },
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStartGame(state, action) {
      const { mode } = action.payload
      state[mode].start = true
      state[mode].startTime = new Date().getTime()
      state[mode].auxTime = []
    },
    setListCard(state, action) {
      const { mode, listCardSort } = action.payload
      state[mode].listCardSort = listCardSort
    },
    setCurrentIndex(state, action) {
      const { mode, index } = action.payload
      state[mode].currentIndex = index
    },
    setOptionList(state, action) {
      const { mode, optionList } = action.payload
      state[mode].optionList = optionList
    },
    setStateOption(state, action) {
      const { mode, stateOption } = action.payload
      state[mode].stateOption = stateOption
    },
    changeStateOption(state, action) {
      const { mode, index, newStateOption } = action.payload
      state[mode].stateOption[index] = newStateOption
    },
    setSelectCorrectOption(state, action) {
      const { mode, selectCorrectList } = action.payload
      state[mode].correctSelectList = selectCorrectList
    },
    setBotLevel(state, action) {
      const { mode, level } = action.payload
      if (state[mode].botLevel !== undefined) {
        state[mode].botLevel = level
      }
    },
    setCorrectBotAnswer(state, action) {
      const { mode, correctAnswer } = action.payload
      if (state[mode].correctBotAnswer !== undefined) {
        state[mode].correctBotAnswer = correctAnswer
      }
    },
    pushAuxTime(state, action) {
      const { mode } = action.payload
      state[mode].auxTime.push(new Date().getTime())
    },
  },
})

export const {
  setStartGame,
  setListCard,
  setCurrentIndex,
  setOptionList,
  setStateOption,
  changeStateOption,
  setSelectCorrectOption,
  setBotLevel,
  setCorrectBotAnswer,
  pushAuxTime,
} = gameSlice.actions

export const reorderGameMode = (listCard, mode) => async (dispatch) => {
  const orderedCards = sortCards(listCard)
  const options = orderedCards.map((card) => createOption(card, listCard))
  const stateOptions = Array.from({ length: orderedCards.length }, () => [
    ColorOption.DEFAULT,
    ColorOption.DEFAULT,
    ColorOption.DEFAULT,
  ])
  const correctSelectList = Array(orderedCards.length).fill(false)

  dispatch(setListCard({ mode: mode, listCardSort: orderedCards }))
  dispatch(setCurrentIndex({ mode: mode, index: 0 }))
  dispatch(setOptionList({ mode: mode, optionList: options }))
  dispatch(setStateOption({ mode: mode, stateOption: stateOptions }))
  dispatch(
    setSelectCorrectOption({
      mode: mode,
      selectCorrectList: correctSelectList,
    })
  )
}

export const resetBot = (mode) => {
  return async (dispatch) => {
    dispatch(setBotLevel({ mode: mode, level: -1 }))
    dispatch(setCorrectBotAnswer({ mode: mode, correctAnswer: 0 }))
  }
}

export const selectOptionMultipleMode = (
  indexListOptions,
  newOptions,
  mode
) => {
  return async (dispatch) => {
    const command = {
      mode: mode,
      index: indexListOptions,
      newStateOption: newOptions,
    }
    dispatch(changeStateOption(command))
  }
}

export default gameSlice.reducer
