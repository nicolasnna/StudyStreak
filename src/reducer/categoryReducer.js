import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    setCategories(state, action) {
      return action.payload
    },
    addCategory(state, action) {  
      state.push(action.payload)
    }
  }
})

export const { setCategories, addCategory } = categorySlice.actions

export const createCategory = (category) => {
  return async (dispatch) => {
    dispatch(addCategory(category))
  }
}

export default categorySlice.reducer