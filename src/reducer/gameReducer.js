import { createSlice } from "@reduxjs/toolkit"
import { createOption, sortCards } from "@utils/commonFunction"
import { ColorOption } from "@utils/constants"

const initialState = {
  basic: {
    start: false,
    listCardSort: [],
    currentIndex: 0,
  },
  multiple: {
    start: false,
    listCardSort: [],
    currentIndex: 0,
    optionList: [],
    stateOption: [],
    correctSelectList: [],
  },
  multipleInverse: {
    start: false,
    listCardSort: [],
    currentIndex: 0,
    optionList: [],
    stateOption: [],
    correctSelectList: [],
  },
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startBasicGame(state) {
      state.basic.start = true
    },
    setBasicListCard(state, action) {
      state.basic.listCardSort = action.payload
    },
    setBasicIndex(state, action) {
      state.basic.currentIndex = action.payload
    },
    startMultipleGame(state) {
      state.multiple.start = true
    },
    setMultipleListCard(state, action) {
      state.multiple.listCardSort = action.payload
    },
    setMultipleIndex(state, action) {
      state.multiple.currentIndex = action.payload
    },
    setMultipleOptionList(state, action) {
      state.multiple.optionList = action.payload
    },
    changeMultipleStateOption(state, action) {
      const index = action.payload.index
      state.multiple.stateOption[index] = action.payload.stateOption
    },
    setMultipleStateOption(state, action) {
      state.multiple.stateOption = action.payload
    },
    setMultipleSelectCorrectOption(state, action) {
      state.multiple.correctSelectList = action.payload
    },
    startMultipleInverseGame(state) {
      state.multipleInverse.start = true
    },
    setMultipleInverseListCard(state, action) {
      state.multipleInverse.listCardSort = action.payload
    },
    setMultipleInverseIndex(state, action) {
      state.multipleInverse.currentIndex = action.payload
    },
    setMultipleInverseOptionList(state, action) {
      state.multipleInverse.optionList = action.payload
    },
    changeMultipleInverseStateOption(state, action) {
      const index = action.payload.index
      state.multipleInverse.stateOption[index] = action.payload.stateOption
    },
    setMultipleInverseStateOption(state, action) {
      state.multipleInverse.stateOption = action.payload
    },
    setMultipleInverseSelectCorrectOption(state, action) {
      state.multipleInverse.correctSelectList = action.payload
    },
  },
})

export const {
  startBasicGame,
  setBasicListCard,
  setBasicIndex,
  startMultipleGame,
  setMultipleListCard,
  setMultipleIndex,
  setMultipleOptionList,
  changeMultipleStateOption,
  setMultipleStateOption,
  setMultipleSelectCorrectOption,
  startMultipleInverseGame,
  setMultipleInverseListCard,
  setMultipleInverseIndex,
  setMultipleInverseOptionList,
  changeMultipleInverseStateOption,
  setMultipleInverseStateOption,
  setMultipleInverseSelectCorrectOption,
} = gameSlice.actions

export const reorderBasicMode = (listCard) => {
  return async (dispatch) => {
    const OrdererCard = sortCards(listCard)
    dispatch(setBasicListCard(OrdererCard))
    dispatch(setBasicIndex(0))
  }
}

export const reorderMultipleMode = (listCard, inverse = false) => {
  return async (dispatch) => {
    const OrdererCard = sortCards(listCard)
    const ListOptions = OrdererCard.map((oc) => createOption(oc, listCard))
    const stateOptions = Array.from({ length: OrdererCard.length }, () => [
      ColorOption.DEFAULT,
      ColorOption.DEFAULT,
      ColorOption.DEFAULT,
    ])
    if (inverse) {
      dispatch(setMultipleInverseListCard(OrdererCard))
      dispatch(setMultipleInverseIndex(0))
      dispatch(setMultipleInverseOptionList(ListOptions))
      dispatch(setMultipleInverseStateOption(stateOptions))
      dispatch(
        setMultipleInverseSelectCorrectOption(
          Array(OrdererCard.length).fill(false)
        )
      )
    } else {
      dispatch(setMultipleListCard(OrdererCard))
      dispatch(setMultipleIndex(0))
      dispatch(setMultipleOptionList(ListOptions))
      dispatch(setMultipleStateOption(stateOptions))
      dispatch(
        setMultipleSelectCorrectOption(Array(OrdererCard.length).fill(false))
      )
    }
  }
}

export const selectOptionMultipleMode = (
  indexListOptions,
  newOptions,
  inverse = false
) => {
  return async (dispatch) => {
    const command = {
      index: indexListOptions,
      stateOption: newOptions,
    }
    dispatch(
      inverse
        ? changeMultipleInverseStateOption(command)
        : changeMultipleStateOption(command)
    )
  }
}

export default gameSlice.reducer
