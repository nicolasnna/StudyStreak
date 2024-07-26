import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: 'toggle',
  initialState: {
    form: false,
    jsonManage: false,
    listCards: false
  },
  reducers: {
    changeForm(state){
      state.form = !state.form
    },
    changeJsonManage(state){
      state.jsonManage = !state.jsonManage
    },
    changeListCards(state){
      state.listCards = !state.listCards
    }
  }
})

export const { changeForm, changeJsonManage, changeListCards } = cardSlice.actions
export default cardSlice.reducer